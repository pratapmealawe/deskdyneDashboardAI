import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';

@Component({
    selector: 'app-create-notification',
    templateUrl: './create-notification.component.html',
    styleUrls: ['./create-notification.component.scss']
})
export class CreateNotificationComponent implements OnInit {
    form: FormGroup;
    isLoading = false;
    orgList: any[] = [];
    cafeteriaList: any[] = [];
    usersList: any[] = [];
    selectedUsers: any[] = [];
    filteredUsersList: any[] = []; // For search/filter within the list

    targetTypes = [
        { value: 'organization', viewValue: 'Organization' },
        { value: 'cafeteria', viewValue: 'Cafeteria' },
        { value: 'individual', viewValue: 'Individual (Select Users)' },
        { value: 'all', viewValue: 'All Users' }
    ];

    minDate = new Date();

    constructor(
        private fb: FormBuilder,
        private apiMainService: ApiMainService,
        private toaster: ToasterService,
        public dialogRef: MatDialogRef<CreateNotificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.form = this.fb.group({
            title: ['', Validators.required],
            body: ['', Validators.required],
            targetType: ['organization', Validators.required],
            targetIds: [[]], // For org/cafeteria multiselect

            // New fields for Individual selection flow
            filterOrgId: [''],
            filterCafeId: [''],
            userSearch: [''], // For filtering the displayed user list
            individualIds: [[]], // Now an array of selected user IDs
            parentOrgId: [''], // For Cascading Cafeteria Selection

            deliveryMode: ['schedule', Validators.required],
            scheduledDate: [new Date()],
            scheduledTime: ['12:00']
        });
    }

    async ngOnInit() {
        await this.fetchOrgList();
        // Cafeteria list now depends on Org selection, so no initial fetch

        if (this.data) {
            this.form.patchValue({
                title: this.data.title,
                body: this.data.body,
                targetType: (this.data.targetType || '').toLowerCase()
            });

            // Handle target population logic
            const type = (this.data.targetType || '').toLowerCase();
            if (type === 'organization') {
                // For Org, targetIds are org IDs.
                this.form.patchValue({ targetIds: this.data.targetIds });
            } else if (type === 'cafeteria') {
                // For Cafeteria, targetIds are cafe IDs.
                // We need to find the parent Org to populate the dropdown and parentOrgId
                if (this.data.targetIds && this.data.targetIds.length > 0) {
                    const firstCafeId = this.data.targetIds[0];
                    // Find org containing this cafe
                    const parentOrg = this.orgList.find(o => o.cafeteriaList && o.cafeteriaList.some((c: any) => c.cafeteria_id === firstCafeId));
                    if (parentOrg) {
                        this.form.patchValue({ parentOrgId: parentOrg.orgID || parentOrg._id });
                        // The subscription will trigger updateCafeteriaList, but might be async or race condition if we patch targetIds immediately.
                        // updateCafeteriaList is synchronous.
                        // But the subscription clears targetIds.
                        // We should wait or manually set it.
                        // The subscription clears targetIds!
                        // We must set targetIds AFTER the subscription runs, or manually update list and set value preventing clear?
                        // The subscription detects change in parentOrgId.
                        // To avoid conflict, we can manually call updateCafeteriaList and set targetIds, 
                        // but we need to ensure the subscription doesn't clear it.
                        // The subscription uses { emitEvent: false } ? No, it clears it.
                        // Let's use emitEvent: false when setting parentOrgId to avoid the subscription clearing targetIds,
                        // then manually update the list and set targetIds.

                        this.form.get('parentOrgId')?.setValue(parentOrg.orgID || parentOrg._id, { emitEvent: false });
                        this.updateCafeteriaList(parentOrg.orgID || parentOrg._id);
                        this.form.patchValue({ targetIds: this.data.targetIds });
                    }
                }
            } else if (type === 'individual') {
                // If we have data.targetIds as user IDs
                // We typically can't fully restore the state without fetching all users or knowing the Org/Cafe context.
                // Best effort: just prefill Title/Body.
            }
        }

        // Watch targetType changes to update validation
        this.form.get('targetType')?.valueChanges.subscribe(val => {
            this.updateValidators(val);
            this.usersList = [];
            this.filteredUsersList = [];
            this.selectedUsers = [];
            this.form.patchValue({
                filterOrgId: '',
                filterCafeId: '',
                individualIds: [],
                userSearch: '',
                targetIds: [], // Clear selections on type change
                parentOrgId: '' // Clear parent org selection
            }, { emitEvent: false });

            // If switching to cafeteria mode, we need to clear cafeteria list until org is selected
            if (val === 'cafeteria') {
                this.cafeteriaList = [];
            }
        });

        // Watch filter changes to fetch users or cafeterias
        this.form.get('filterOrgId')?.valueChanges.subscribe(async (val) => {
            if (this.form.get('targetType')?.value === 'individual') {
                this.form.patchValue({ filterCafeId: '' }, { emitEvent: false });
                this.updateCafeteriaList(val);
                await this.fetchUsersByOrg(val);
            }
        });

        // NEW: specific handler for 'cafeteria' target type organization selection
        this.form.get('parentOrgId')?.valueChanges.subscribe(val => {
            if (this.form.get('targetType')?.value === 'cafeteria') {
                this.form.patchValue({ targetIds: [] }, { emitEvent: false }); // Clear selected cafeterias
                this.updateCafeteriaList(val);
            }
        });

        this.form.get('filterCafeId')?.valueChanges.subscribe(async (val) => {
            if (val && this.form.get('targetType')?.value === 'individual') {
                // If org is already selected, we don't clear it.
                // We just fetch users for this cafe
                await this.fetchUsersByCafe(val);
            }
        });

        this.form.get('userSearch')?.valueChanges.subscribe(val => {
            this.filterUsers(val);
        });

        // Watch parentOrgId for Cafeteria mode logic similarly
        this.form.get('parentOrgId')?.valueChanges.subscribe(val => {
            if (this.form.get('targetType')?.value === 'cafeteria') {
                // Update cafeteria list based on this org
                this.updateCafeteriaList(val);
                // Reset targetIds (cafeteria selection)
                this.form.patchValue({ targetIds: [] });
            }
        });

        this.updateValidators('organization'); // Initial state
    }

    updateValidators(targetType: string) {
        const targetIdsControl = this.form.get('targetIds');
        const individualIdsControl = this.form.get('individualIds');
        const filterOrgIdControl = this.form.get('filterOrgId');
        const parentOrgIdControl = this.form.get('parentOrgId'); // New control

        // Reset validators
        targetIdsControl?.clearValidators();
        individualIdsControl?.clearValidators();
        filterOrgIdControl?.clearValidators();
        parentOrgIdControl?.clearValidators(); // Clear for new control

        if (targetType === 'organization') {
            targetIdsControl?.setValidators([Validators.required]);
        } else if (targetType === 'cafeteria') {
            // For cafeteria, we need to select specific cafeterias (targetIds)
            // AND we logically need an org selected to populate the list. 
            // I'll add a validator for the Org control in the HTML update step.
            targetIdsControl?.setValidators([Validators.required]);
            parentOrgIdControl?.setValidators([Validators.required]); // Parent org is required for cafeteria selection
        } else if (targetType === 'individual') {
            individualIdsControl?.setValidators([Validators.required]);
        }

        targetIdsControl?.updateValueAndValidity();
        individualIdsControl?.updateValueAndValidity();
        filterOrgIdControl?.updateValueAndValidity();
        parentOrgIdControl?.updateValueAndValidity(); // Update validity for new control
    }

    async fetchOrgList() {
        try {
            // Using B2B_fetchFilteredAllOrgs matching outlet-billing pattern
            const searchObj = { countOnly: false };
            const res: any = await this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, 1);
            if (res) {
                // The API returns paginated data usually, let's check structure or assume res.data is the list if it matches previous usage
                // In outlet-billing: this.orglist = await this.api.B2B_fetchFilteredAllOrgs(searchObj, page);
                // And in common-outlet-cafe-select: this.orglist = await ... 
                // apiMainService.ts says: return this.apiHttpService.REQUEST(...) 
                // Let's assume it returns { data: [...] } or just [...]
                // Looking at common-select, it assigns directly: this.orglist = await ...
                // So I should check if res is the array or res.data. 
                // apiMainService.ts typically returns the response body.
                // B2B_fetchFilteredAllOrgs likely returns { status: true, data: [...] } or just [...]
                // I will try assuming standard service response { status, data } or if it returns direct array.
                // Safest is to log or check; but based on previous code `getOrgList` returned {status, data}.
                // `B2B_fetchFilteredAllOrgs` is used in `CommonOutletCafeSelectComponent`: `this.orglist = await ...`.
                // If `apiHttpService.REQUEST` returns the body, and `B2B_fetchFilteredAllOrgs` is a standard API, it likely returns an object with data.
                // However, CommonOutletCafeSelectComponent uses `this.orglist = await this.api.B2B_fetchFilteredAllOrgs(...)`.
                // This implies the promise resolves to the list itself OR `CommonComponent` handles it loosely.
                // I'll write code to handle both or `res.data`.

                this.orgList = Array.isArray(res) ? res : (res.data || []);
            }
        } catch (error) {
            console.error('Error fetching org list', error);
        }
    }

    // Helper to update cafeteria list based on selected Org ID
    updateCafeteriaList(orgId: string) {
        const selectedOrg = this.orgList.find(o => o.orgID === orgId || o._id === orgId);
        if (selectedOrg && selectedOrg.cafeteriaList) {
            this.cafeteriaList = selectedOrg.cafeteriaList;
        } else {
            this.cafeteriaList = [];
        }
    }

    async fetchUsersByOrg(orgId: string) {
        if (!orgId) return;
        this.isLoading = true;
        try {
            const res: any = await this.apiMainService.getEmployeeListByOrgId(orgId);
            if (res && res.status) {
                this.usersList = res.data || [];
                this.filterUsers(this.form.get('userSearch')?.value);
            } else {
                this.usersList = [];
                this.filteredUsersList = [];
                this.toaster.info('No users found.');
            }
        } catch (error) {
            console.error('Error fetching users by org', error);
            this.toaster.error('Failed to fetch users.');
            this.usersList = [];
            this.filteredUsersList = [];
        } finally {
            this.isLoading = false;
        }
    }

    async fetchUsersByCafe(cafeId: string) {
        if (!cafeId) return;
        this.isLoading = true;
        try {
            const res: any = await this.apiMainService.getEmployeelistByCafeteriaId(cafeId);
            if (res && res.status) {
                this.usersList = res.data || [];
                this.filterUsers(this.form.get('userSearch')?.value);
            } else {
                this.usersList = [];
                this.filteredUsersList = [];
                this.toaster.info('No users found.');
            }
        } catch (error) {
            console.error('Error fetching users by cafeteria', error);
            this.toaster.error('Failed to fetch users.');
            this.usersList = [];
            this.filteredUsersList = [];
        } finally {
            this.isLoading = false;
        }
    }

    filterUsers(query: string) {
        if (!query) {
            this.filteredUsersList = this.usersList;
            return;
        }
        const lowerQuery = query.toLowerCase();
        this.filteredUsersList = this.usersList.filter(u =>
            (u.emp_name?.toLowerCase().includes(lowerQuery)) ||
            (u.emp_id?.toLowerCase().includes(lowerQuery)) ||
            (u.emp_email?.toLowerCase().includes(lowerQuery))
        );
    }

    toggleUserSelection(user: any) {
        const index = this.selectedUsers.findIndex(u => u._id === user._id);
        if (index === -1) {
            this.selectedUsers.push(user);
        } else {
            this.selectedUsers.splice(index, 1);
        }
        this.updateIndividualIds();
    }

    isUserSelected(user: any): boolean {
        return this.selectedUsers.some(u => u._id === user._id);
    }

    removeUser(user: any) {
        this.selectedUsers = this.selectedUsers.filter(u => u._id !== user._id);
        this.updateIndividualIds();
    }

    // Helper to generate initials
    getInitials(name: string | undefined): string {
        if (!name) return '?';
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    updateIndividualIds() {
        const ids = this.selectedUsers.map(u => u._id);
        this.form.patchValue({ individualIds: ids });
        this.form.get('individualIds')?.updateValueAndValidity();
    }

    async submit() {
        if (this.form.invalid) return;

        this.isLoading = true;
        const formVal = this.form.value;

        const payload: any = {
            title: formVal.title,
            body: formVal.body,
            targetType: formVal.targetType,
            notificationType: 'USER'
        };

        if (formVal.targetType === 'individual') {
            payload.targetIds = formVal.individualIds;
        } else if (formVal.targetType !== 'all') {
            payload.targetIds = formVal.targetIds;
        }

        // Handle Delivery (Schedule vs Send Now)
        if (formVal.deliveryMode === 'schedule') {
            const date = new Date(formVal.scheduledDate);
            if (formVal.scheduledTime) {
                const [hours, minutes] = formVal.scheduledTime.split(':').map((val: string) => parseInt(val, 10));
                date.setHours(hours, minutes, 0, 0);
            }

            payload.scheduledAt = date.toISOString();

            try {
                const res: any = await this.apiMainService.createScheduledNotification(payload);
                this.handleResponse(res);
            } catch (err) {
                this.handleError(err);
            }

        } else {
            try {
                const res: any = await this.apiMainService.sendNowNotification(payload);
                this.handleResponse(res);
            } catch (err) {
                this.handleError(err);
            }
        }
    }

    handleResponse(res: any) {
        this.isLoading = false;
        if (res) {
            this.toaster.success('Notification submitted successfully');
            this.dialogRef.close(true);
        } else {
            this.toaster.error(res.message || 'Operation failed');
        }
    }

    handleError(err: any) {
        this.isLoading = false;
        console.error(err);
        this.toaster.error('Something went wrong');
    }

    close() {
        this.dialogRef.close(false);
    }
}

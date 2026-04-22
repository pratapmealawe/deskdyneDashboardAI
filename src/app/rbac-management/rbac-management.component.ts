import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { AddRoleDialogComponent } from './add-role-dialog/add-role-dialog.component';
import { ManagePermissionsComponent } from './manage-permissions/manage-permissions.component';
import { SearchFilterService } from '@service/search-filter.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';

@Component({
  selector: 'app-rbac-management',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialModule, 
    MatDialogModule, 
    ReactiveFormsModule,
    AddRoleDialogComponent,
    ManagePermissionsComponent
  ],
  templateUrl: './rbac-management.component.html',
  styleUrls: ['./rbac-management.component.scss']
})
export class RbacManagementComponent implements OnInit {
  private apiMainService = inject(ApiMainService);
  private dialog = inject(MatDialog);
  private searchFilterService = inject(SearchFilterService);
  private toasterService = inject(ToasterService);
  private confirmationModalService = inject(ConfirmationModalService);

  roles: any[] = [];
  filteredRoles: any[] = [];
  roleSearchControl = new FormControl('');

  ngOnInit(): void {
    this.loadRoles();
    this.roleSearchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.applyFilter(value || '');
    });
  }

  async loadRoles() {
    try {
      this.roles = await this.apiMainService.getAllRoles() as any[];
      this.applyFilter(this.roleSearchControl.value || '');
    } catch (error) {
      console.error('Error loading roles:', error);
    }
  }

  applyFilter(query: string) {
    if (!query) {
      this.filteredRoles = this.roles;
      return;
    }
    const config = { keys: ['name', 'description'] };
    this.filteredRoles = this.searchFilterService.searchData(this.roles, config, query);
  }

  getInitials(name: string): string {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  openAddRoleDialog(role?: any) {
    const dialogRef = this.dialog.open(AddRoleDialogComponent, {
      width: '950px',
      maxWidth: '95vw',
      data: role,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toasterService.success(role ? 'Role updated successfully' : 'Role created successfully');
        this.loadRoles();
      }
    });
  }

  async deleteRole(role: any) {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete the "${role.name}" role? This action cannot be undone.`,
      context: this,
      callback: async () => {
        try {
          await this.apiMainService.deleteRole(role._id);
          this.toasterService.success('Role deleted successfully');
          this.loadRoles();
        } catch (error) {
          console.error('Error deleting role:', error);
        }
      }
    });
  }
}

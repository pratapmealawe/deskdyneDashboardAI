import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiMainService } from '../../service/apiService/apiMain.service';
import { ToasterService } from '../../service/toaster.service';
import { ConfirmationModalService } from '../../service/confirmation-modal.service';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GroupForceLogoutComponent } from './group-force-logout/group-force-logout.component';

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.scss']
})
export class SessionManagementComponent implements OnInit, OnDestroy {
  pagedSessions: any[] = [];
  isLoading: boolean = false;
  appTypes: string[] = ['USER', 'VENDOR', 'ADMIN'];
  selectedAppType: string = 'USER';
  
  sessionStatuses: string[] = ['ALL', 'ACTIVE', 'INACTIVE'];
  selectedStatus: string = 'ALL';
  
  // Pagination
  pageSize: number = 10;
  pageIndex: number = 0;
  totalSessions: number = 0;

  // Search
  searchTerm: string = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    private confirmationModalService: ConfirmationModalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshSessions();
    this.setupSearchSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.pageIndex = 0; // Reset page index on new search
      this.refreshSessions();
    });
  }

  refreshSessions(): void {
    this.isLoading = true;
    const options = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm,
      status: this.selectedStatus
    };
    
    this.apiMainService.getActiveSessions(this.selectedAppType, options).then((res: any) => {
      const data = res.data || [];
      this.totalSessions = res.total || 0;
      
      this.pagedSessions = data.map((s: any) => {
        let displayName = s.name || 'Anonymous';
        if (this.selectedAppType === 'ADMIN' && displayName === 'Admin') {
          displayName = s.adminId || 'Admin User';
        } else if (this.selectedAppType === 'USER' && (displayName === 'Unknown' || displayName === 'Anonymous')) {
          displayName = s.email || (s.phoneNo ? s.phoneNo.toString() : 'User Session');
        } else if (this.selectedAppType === 'VENDOR' && (displayName === 'Vendor' || displayName === 'Anonymous')) {
          displayName = (s.phoneNo ? s.phoneNo.toString() : 'Vendor Session');
        }
        return { ...s, displayName };
      });
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshSessions();
  }

  onSearch(event: any) {
    this.searchSubject.next(event.target.value);
  }

  openGroupLogoutDialog() {
    const dialogRef = this.dialog.open(GroupForceLogoutComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshSessions();
      }
    });
  }

  forceLogoutSelected(session: any): void {
     this.confirmationModalService.modal({
      msg: `Are you sure you want to FORCE LOGOUT this specific session?`,
      context: this,
      callback: () => {
        const payload = {
          targetType: 'individual',
          targetIds: [session._id],
          appType: this.selectedAppType
        };
        this.apiMainService.forceLogout(payload).then((res: any) => {
          this.toasterService.success('Session invalidated.');
          this.refreshSessions();
        }).catch(err => {
          this.toasterService.error('Failed to invalidate session');
        });
      }
    });
  }
}

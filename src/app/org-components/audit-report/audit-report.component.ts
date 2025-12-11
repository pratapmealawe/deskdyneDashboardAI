import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { AddAuditReportDialogComponent } from './add-audit-report-dialog/add-audit-report-dialog.component';
import { PdfPreviewDialogComponent } from './pdf-preview-dialog/pdf-preview-dialog.component';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.scss']
})
export class AuditReportComponent implements OnInit {
  @Input() adminOrg: any;

  // Dropdown data
  orglist: any[] = [];
  cafeList: any[] = [];

  auditReports: any[] = [];
  displayedColumns: string[] = ['orgName', 'cafeteriaName', 'uploadedDate', 'uploadedByName', 'actions'];

  // Selections
  selectedOrgId: string = '';
  selectedCafeId: string = '';
  selectedDate: Date = new Date();

  // Loading state
  loadingOrgs = false;

  // fileUrl + uploadPath
  fileUrl: string = environment.fileUrl;

  isOrgAdmin: boolean = false;
  orgAdmin: any;

  constructor(private api: ApiMainService, private dialog: MatDialog, private localStorageService: LocalStorageService,) { }

  ngOnInit(): void {
    this.loadOrgs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      const previous = changes['adminOrg'].previousValue;
      const current = changes['adminOrg'].currentValue;
      if (previous && previous._id === current._id) return;
      this.loadOrgs()
    }
  }

  setInitials() {
    if (this.adminOrg) {
      this.selectedOrgId = this.adminOrg._id;
      this.onOrgChange(this.adminOrg._id);
    }

    this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');


    if (this.orgAdmin?.role === 'ORGADMIN') {
      this.selectedOrgId = this.orgAdmin.orgDetails._id;
      this.onOrgChange(this.orgAdmin.orgDetails._id);
    }
  }

  async loadOrgs() {
    try {
      this.loadingOrgs = true;
      const page = 1;
      const searchObj = { countOnly: false };
      this.orglist = await this.api.B2B_fetchFilteredAllOrgs(searchObj, page);

      // if (this.isOrgAdmin) {
      this.setInitials();
      // }
    } catch (err) {
      console.error('Error fetching org list:', err);
    } finally {
      this.loadingOrgs = false;
    }
  }

  onOrgChange(orgId: string) {
    this.selectedOrgId = orgId;
    this.selectedCafeId = '';
    console.log(this.orglist);

    const org = this.orglist.find((o: any) => o._id === orgId);
    console.log(org);
    this.cafeList = org?.cafeteriaList || [];
  }

  onCafeChange(cafeId: string) {
    this.selectedCafeId = cafeId;
  }

  filterSubmitted() {
    if (!this.selectedOrgId || !this.selectedCafeId) {
      return;
    }
    this.fetchAuditReport();
  }

  async fetchAuditReport() {
    try {
      const payload = {
        orgId: this.selectedOrgId,
        cafeteriaId: this.selectedCafeId,
        date: this.selectedDate
      };
      const data = await this.api.getByOrgIdAndCafeteriaIdAndDate(payload);
      console.log(data);
      this.auditReports = Array.isArray(data) ? data : (data ? [data] : []);
    } catch (err) {
      console.error('Error fetching reports:', err);
      this.auditReports = [];
    }
  }

  openCreateReportDialog() {
    this.dialog.open(AddAuditReportDialogComponent, {
      width: '500px',
      data: {
        mode: 'create',
        orgList: this.orglist
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.filterSubmitted(); // Refresh list
      }
    });
  }

  openEditReportDialog(report: any) {
    this.dialog.open(AddAuditReportDialogComponent, {
      width: '500px',
      data: {
        mode: 'edit',
        orgList: this.orglist,
        report: report
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.filterSubmitted(); // Refresh list
      }
    });
  }

  viewPdf(report: any) {
    if (!report.uploadedUrl) return;
    this.dialog.open(PdfPreviewDialogComponent, {
      width: '60%',
      height: '70%',
      data: {
        url: `${this.fileUrl}${report.uploadedUrl}`,
        fileName: `Audit_Report_${report.orgName}_${new Date(report.uploadedDate).toISOString().split('T')[0]}.pdf`
      }
    });
  }

  async deleteReport(report: any) {
    if (confirm('Are you sure you want to delete this report?')) {
      try {
        await this.api.deleteAuditReport(report._id);
        this.filterSubmitted();
      } catch (err) {
        console.error('Error deleting report:', err);
      }
    }
  }
}

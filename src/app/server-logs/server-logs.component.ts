import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-server-logs',
  templateUrl: './server-logs.component.html',
  styleUrls: ['./server-logs.component.scss']
})
export class ServerLogsComponent implements OnInit {
  @ViewChild('listing', { static: false }) listing!: ElementRef<HTMLDivElement>;
  @ViewChild('contentPayload') contentPayload!: TemplateRef<any>;
  selectedStatus = 'AuditLogs';
  selectedDBStatus = '100';
  selectedLevel = 'All';
  logsList: any[] = [];
  logPayload: any;
  startDate = '';
  endDate = '';
  access = { serverLogs: true, serverErrorLogs: true };
  isLoading = false;
  hasMoreData = true;
  searchText = '';
  filteredLogsList: any[] = [];
  maxDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private apiMainService: ApiMainService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadLogs('AuditLogs', '100');
  }

  onSearchChange() {
    this.logsList = []; // Clear list for new search
    // Trigger reload with current status
    if (this.startDate && this.endDate) {
      this.loadLogs(this.selectedStatus as any, '', { start: this.startDate, end: this.endDate });
    } else {
      this.loadLogs(this.selectedStatus as any, this.selectedDBStatus);
    }
  }

  clearSearch() {
    this.searchText = '';
    this.selectedLevel = 'All';
    this.onSearchChange();
  }

  filterByLevel(level: string) {
    this.selectedLevel = level;
    this.onSearchChange();
  }

  // Restoring filterLogs for compatibility, but it just syncs lists now since filtering is server-side
  filterLogs() {
    this.filteredLogsList = [...this.logsList];
  }

  loadLogs(type: 'AuditLogs' | 'DBLogs', limitOrHour: string, range?: { start: string, end: string }) {
    this.selectedStatus = type;
    this.selectedDBStatus = limitOrHour;
    this.isLoading = true;
    let params: any = {};
    let apiCall: Promise<any>;
    if (this.selectedLevel && this.selectedLevel !== 'All') {
      params.level = this.selectedLevel;
    }

    if (range) {
      // if (!range.start || !range.end) return alert('Please select both start and end dates');
      params = { from: new Date(range.start).getTime(), to: new Date(range.end).getTime() };
    } else if (limitOrHour.includes('hr') || limitOrHour.includes('Day')) {
      const hourMap: any = { '1hr': 1, '2hr': 2, '5hr': 5, '1Day': 24, '2Day': 48 };
      params = { hour: hourMap[limitOrHour] };
    } else {
      params = { limit: parseInt(limitOrHour) };
    }

    // Always append search text if present
    if (this.searchText.trim()) {
      params.searchObj = this.searchText.trim();
    }

    apiCall = type === 'AuditLogs' ? this.apiMainService.getAuditLogs(params) : this.apiMainService.getServerLogs(params);
    apiCall.then((response: any) => {
      // If response is array, user previously appended. 
      // Ideally we should reset if it's a fresh load, but loadMore relies on append?
      // For now, adhering to user's "append" logic but we cleared logsList in onSearchChange for search events.
      if (response && Array.isArray(response)) {
        this.logsList = [...this.logsList, ...response];
      }
      this.filterLogs();
      this.isLoading = false;
    }).catch((error: any) => {
      console.error(`Error fetching ${type === 'AuditLogs' ? 'audit' : 'server'} logs:`, error);
      this.isLoading = false;
    });
  }

  getAuditLogs() {
    this.searchText = '';
    this.selectedLevel = 'All';
    this.loadLogs('AuditLogs', '100');
  }

  getMLDBLogs() {
    this.searchText = '';
    this.selectedLevel = 'All';
    this.loadLogs('DBLogs', '100');
  }

  getLineBasedAuditLogs(limit: string) {
    this.loadLogs('AuditLogs', limit);
  }

  getTimeBasedAuditLogs(hour: string) {
    this.loadLogs('AuditLogs', hour);
  }

  getDayRangeBasedAuditLogs(start: string, end: string) {
    this.loadLogs('AuditLogs', '', { start, end });
  }

  getLineBasedLogs(limit: string) {
    this.loadLogs('DBLogs', limit);
  }

  getTimeBasedLogs(hour: string) {
    this.loadLogs('DBLogs', hour);
  }

  getDayRangeBasedLogs(start: string, end: string) {
    this.loadLogs('DBLogs', '', { start, end });
  }

  payloadView(payload: any) {
    this.logPayload = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
    this.modalService.open(this.contentPayload, { size: 'lg', scrollable: true });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.listing) return;
    const element = this.listing.nativeElement;
    const rect = element.getBoundingClientRect();
    const scrollable = element.scrollHeight > window.innerHeight;
    if (scrollable && rect.bottom <= window.innerHeight + 50 && !this.isLoading && this.hasMoreData) {
      this.loadMore();
    }
  }

  loadMore() {
    if (this.selectedDBStatus && !this.selectedDBStatus.includes('hr') && !this.selectedDBStatus.includes('Day')) {
      const currentLimit = parseInt(this.selectedDBStatus);
      if (!isNaN(currentLimit)) {
        const newLimit = currentLimit + 50;
        this.loadLogs(this.selectedStatus as any, newLimit.toString());
      }
    }
  }
}
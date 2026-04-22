import { Component } from '@angular/core';
import { AddUpdateConfigImagesGroupComponent } from './add-update-config-images-group/add-update-config-images-group.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-config-images-group',
  templateUrl: './config-images-group.component.html',
  styleUrls: ['./config-images-group.component.scss']
})
export class ConfigImagesGroupComponent {
  imageGroupConfigs: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  isLoading: boolean = false;
  hasError: boolean = false;
  searchTerm: string = '';

  constructor(
    private modalService: NgbModal,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loadImageGroupConfigs();
  }

  async loadImageGroupConfigs(): Promise<void> {
    this.isLoading = true;
    this.hasError = false;
    try {
      const response: any = await this.apiMainService.getAllImageGroupConfigs(this.currentPage, this.pageSize);
      this.totalItems = response?.total || 0;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.imageGroupConfigs = response?.configs || [];
    } catch (error) {
      console.error('Error fetching image group configs:', error);
      this.hasError = true;
      this.toasterService.error('Failed to load image group configs');
    } finally {
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.loadImageGroupConfigs();
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get filteredConfigs(): any[] {
    if (!this.searchTerm?.trim()) return this.imageGroupConfigs;
    const term = this.searchTerm.toLowerCase().trim();
    return this.imageGroupConfigs.filter((c: any) =>
      c.name?.toLowerCase().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  openAddConfigModal(): void {
    const modalRef = this.modalService.open(AddUpdateConfigImagesGroupComponent, { size: 'xl' });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.formData = { name: '', imageData: [] };

    modalRef.result.then((newConfig: any) => {
      if (newConfig) {
        this.imageGroupConfigs.unshift(newConfig);
        this.totalItems++;
        this.toasterService.success('Image group created successfully');
      }
    }).catch(() => { });
  }

  async editConfig(config: any): Promise<void> {
    if (!config?._id) return;

    try {
      const imageGroupConfig = await this.apiMainService.getImageGroupConfigById(config._id);
      if (!imageGroupConfig) {
        this.toasterService.error('Image group config not found');
        return;
      }

      const modalRef = this.modalService.open(AddUpdateConfigImagesGroupComponent, { size: 'xl' });
      modalRef.componentInstance.isEdit = true;
      modalRef.componentInstance.editId = config._id;
      modalRef.componentInstance.formData = { ...imageGroupConfig };

      modalRef.result.then((updatedConfig: any) => {
        if (updatedConfig) {
          const index = this.imageGroupConfigs.findIndex(c => c._id === updatedConfig._id);
          if (index !== -1) {
            this.imageGroupConfigs[index] = updatedConfig;
          }
          this.toasterService.success('Image group updated successfully');
        }
      }).catch(() => { });

    } catch (error) {
      console.error('Error fetching image group config:', error);
      this.toasterService.error('Failed to load image group for editing');
    }
  }

  confirmDelete(config: any): void {
    if (!config?._id) return;

    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete "${config.name}"?`,
      callback: () => this.deleteConfig(config._id),
      context: this
    });
  }

  async deleteConfig(configId: string): Promise<void> {
    try {
      await this.apiMainService.deleteImageGroupConfig(configId);
      this.toasterService.success('Image group deleted successfully');
      this.loadImageGroupConfigs();
    } catch (error) {
      console.error('Delete error:', error);
      this.toasterService.error('Failed to delete image group config');
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadImageGroupConfigs();
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.loadImageGroupConfigs();
  }
}

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-add-update-config-images-group',
  templateUrl: './add-update-config-images-group.component.html',
  styleUrls: ['./add-update-config-images-group.component.scss']
})
export class AddUpdateConfigImagesGroupComponent {
@Input() isEdit: boolean = false;
  @Input() editId?: string;
  @Input() formData: any = { name: '', imageData: [] };
  serverUrl = environment.imageUrl;
  allImages: any[] = [];
  saving: boolean = false;

  constructor(
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    public activeModal: NgbActiveModal // Use ActiveModal to control the modal
  ) { }

  ngOnInit(): void {
    this.getAllConfigImages();
  }

  async getAllConfigImages(): Promise<void> {
    try {
      const response = await this.apiMainService.getAllConfigImages();
      this.allImages = response?.length ? response : [];
    } catch (error) {
      console.error('❌ Error fetching config images:', error);
      this.toasterService.error('Failed to load config images');
    }
  }

  toggleImageSelection(imageId: string,imageUrl:string): void {
    if (!this.formData.imageData) {
      this.formData.imageData = [];
    }
    const index = this.formData.imageData.indexOf(imageUrl);
    if (index > -1) {
      this.formData.imageData.splice(index, 1);
    } else {
      this.formData.imageData.push(imageUrl);
    }
  }
  slectedImage(img:any){
console.log(img,"img");
  }

  async saveConfig(): Promise<void> {
    if (!this.formData?.name || !this.formData?.imageData?.length) {
      this.toasterService.error('Please provide a group name and select at least one image');
      return;
    }
    this.saving = true;
    try {
      let res;
      console.log(this.formData);
      if (this.isEdit && this.editId) {
        res = await this.apiMainService.updateImageGroupConfig(this.editId, this.formData);
        this.toasterService.success('✅ Updated Successfully');
      } else {
        res = await this.apiMainService.createImageGroupConfig(this.formData);
        this.toasterService.success('✅ Created Successfully');
      }
      await this.getAllConfigImages();
      this.activeModal.close(res);
    } catch (error) {
      console.error('❌ Error saving config:', error);
      this.toasterService.error('Something went wrong while saving');
    } finally {
      this.saving = false;
    }
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Dismiss modal without saving
  }

  get isSaveDisabled(): boolean {
    return !this.formData.name && this.formData?.images?.length > 0;
  }

}

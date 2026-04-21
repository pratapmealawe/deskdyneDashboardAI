import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditPermissionDialogComponent } from './edit-permission-dialog/edit-permission-dialog.component';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';

@Component({
  selector: 'app-manage-permissions',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss']
})
export class ManagePermissionsComponent implements OnInit {
  private apiMainService = inject(ApiMainService);
  private dialog = inject(MatDialog);
  private toasterService = inject(ToasterService);
  private confirmationModalService = inject(ConfirmationModalService);

  resourceGroups: Array<{ name: string, permissions: any[] }> = [];
  filteredGroups: Array<{ name: string, permissions: any[] }> = [];
  
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.loadResources();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.filterResources(query || '');
    });
  }

  async loadResources() {
    try {
      const data = await this.apiMainService.getAllPermissions() as any[];
      
      const groupsMap = data.reduce((acc, p) => {
        if (!acc[p.resource]) {
          acc[p.resource] = [];
        }
        acc[p.resource].push(p);
        return acc;
      }, {} as { [key: string]: any[] });

      this.resourceGroups = Object.keys(groupsMap).map(name => ({
        name,
        permissions: groupsMap[name].sort((a: { action: string; }, b: { action: any; }) => a.action.localeCompare(b.action))
      })).sort((a, b) => a.name.localeCompare(b.name));

      this.filterResources(this.searchControl.value || '');
    } catch (error) {
      console.error('Error loading resources:', error);
    }
  }

  filterResources(query: string) {
    this.filteredGroups = this.resourceGroups.filter(g => 
      g.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  openAddModuleDialog() {
    const dialogRef = this.dialog.open(EditPermissionDialogComponent, {
      width: '550px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadResources();
      }
    });
  }

  async deleteResource(name: string) {
    this.confirmationModalService.modal({
      msg: `CRITICAL: This will delete ALL permission keys for "${name}". This may break some roles. Continue?`,
      context: this,
      callback: async () => {
        try {
          await this.apiMainService.deleteResource(name);
          this.toasterService.success('Module deleted successfully');
          this.loadResources();
        } catch (error) {
          console.error('Error deleting resource:', error);
        }
      }
    });
  }

  openEditDialog(group: any) {
    const dialogRef = this.dialog.open(EditPermissionDialogComponent, {
      width: '850px',
      data: { 
        resource: group.name,
        permissions: group.permissions
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadResources();
      }
    });
  }
}

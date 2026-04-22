import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { AddEditAppVersionControlComponent } from './add-edit-app-version-control/add-edit-app-version-control.component';

@Component({
  selector: 'app-app-version-control',
  templateUrl: './app-version-control.component.html',
  styleUrls: ['./app-version-control.component.scss'],
})
export class AppVersionControlComponent implements OnInit {
  allAppVersions: any = [];

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllAppVersions();
  }

  async getAllAppVersions() {
    try {
      const allAppVersions = await this.apiMainService.getAllAppVersionList();
      if (allAppVersions && allAppVersions.length > 0) {
        this.allAppVersions = allAppVersions;
      } else {
        this.allAppVersions = [];
      }
    } catch (e) {
    }
  }

  addVariable() {
    this.openDialog(null, true);
  }

  editVariable(variableObj: any) {
    this.openDialog(variableObj, false);
  }

  openDialog(variableObj: any, addnewVariable: boolean) {
    const dialogRef = this.dialog.open(AddEditAppVersionControlComponent, {
      width: '600px',
      data: {
        variableObj: variableObj || {},
        addnewVariable: addnewVariable
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        if (result.action === 'submit') {
          await this.submitnewVariable(result.data);
        } else if (result.action === 'update') {
          await this.updateVariable(result.data);
        }
      }
    });
  }

  async submitnewVariable(variableObj: any) {
    try {
      await this.apiMainService.saveAppVersion(variableObj);
      this.getAllAppVersions();
    } catch (e) {
    }
  }

  async updateVariable(variableObj: any) {
    try {
      await this.apiMainService.updateAppVersion(variableObj);
      this.getAllAppVersions();
    } catch (e) {
    }
  }
}

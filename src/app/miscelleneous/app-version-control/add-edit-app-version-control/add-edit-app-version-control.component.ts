import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-app-version-control',
  templateUrl: './add-edit-app-version-control.component.html',
  styleUrls: ['./add-edit-app-version-control.component.scss']
})
export class AddEditAppVersionControlComponent implements OnInit {
  variableObj: any = {};
  addnewVariable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditAppVersionControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.variableObj = { ...data.variableObj };
      this.addnewVariable = data.addnewVariable;
    }
  }

  ngOnInit(): void {
  }

  submit() {
    this.dialogRef.close({ action: 'submit', data: this.variableObj });
  }

  update() {
    this.dialogRef.close({ action: 'update', data: this.variableObj });
  }

  cancel() {
    this.dialogRef.close();
  }
}

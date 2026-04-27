import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { PermissionsService } from '@service/permission.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-outlet-categories',
  templateUrl: './outlet-categories.component.html',
  styleUrls: ['./outlet-categories.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OutletCategoriesComponent implements OnInit {
  @Input() outletObj: any;
  categoryForm: any;
  btnPolicy: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiMainService: ApiMainService,
    private permissionsService: PermissionsService
  ) {}

  ngOnInit() {
    this.btnPolicy = this.permissionsService.getCurrentButtonPolicy();
    this.categoryForm = this.formBuilder.group({
      categories: this.formBuilder.array([this.createCategory()]),
    });
    if (this.outletObj.category && this.outletObj.category.length > 0) {
      this.patchFormValues(this.outletObj.category);
    }
  }

  patchFormValues(data: any) {
    const categoriesFormArray = this.categoryForm.get(
      'categories'
    ) as FormArray;
    categoriesFormArray.clear();

    data.forEach((category: any) => {
      const categoryFormGroup = this.formBuilder.group({
        name: category.name,
        subCategories: this.formBuilder.array(category.subCategories || []),
      });
      categoriesFormArray.push(categoryFormGroup);
    });
  }

  createCategory(): FormGroup {
    return this.formBuilder.group({
      name: '',
      subCategories: this.formBuilder.array([]),
    });
  }

  addCategory(): void {
    const categories = this.categoryForm.get('categories') as FormArray;
    categories.push(this.createCategory());
  }

  removeCategory(index: number): void {
    const categories = this.categoryForm.get('categories') as FormArray;
    categories.removeAt(index);
  }

  addValue(category: FormGroup): void {
    const values = category.get('subCategories') as FormArray;
    values.push(this.formBuilder.control(''));
  }

  removeValue(category: FormGroup, index: number): void {
    const values = category.get('subCategories') as FormArray;
    values.removeAt(index);
  }

  async onSubmit() {
    try {
      const obj = { ...this.outletObj, ...this.categoryForm.value };
      await this.apiMainService.updateCategories(obj);
    } catch (error) {
    }
  }
}


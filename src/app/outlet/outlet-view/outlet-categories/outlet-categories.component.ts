import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-outlet-categories',
  templateUrl: './outlet-categories.component.html',
  styleUrls: ['./outlet-categories.component.scss']
})
export class OutletCategoriesComponent implements OnInit {
  @Input() outletObj:any;
  categoryForm: any;

  constructor(private formBuilder: FormBuilder, private apiMainService:ApiMainService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      categories: this.formBuilder.array([this.createCategory()])
    });
    if(this.outletObj.category && this.outletObj.category.length>0){
      this.patchFormValues(this.outletObj.category)
    }
    console.log(this.outletObj)
  }

  patchFormValues(data:any){
    console.log('data',data)
    const categoriesFormArray = this.categoryForm.get('categories') as FormArray;
    categoriesFormArray.clear();

    data.forEach((category:any) => {
      const categoryFormGroup = this.formBuilder.group({
        name: category.name,
        subCategories: this.formBuilder.array(category.subCategories || [])
      });
      categoriesFormArray.push(categoryFormGroup);
    });
  }

  createCategory(): FormGroup {
    return this.formBuilder.group({
      name: '',
      subCategories: this.formBuilder.array([])
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
      const obj = {...this.outletObj,...this.categoryForm.value};
      await this.apiMainService.updateCategories(obj);
    } catch (error) {
      console.log(error)
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-master-categories',
  templateUrl: './master-categories.component.html',
  styleUrls: ['./master-categories.component.scss']
})
export class MasterCategoriesComponent implements OnInit {
  categoryValues:any;
  subCategoryValues:any;
  allCategories:any

  constructor(private apiMainService:ApiMainService){}

  ngOnInit(): void {
    this.fetchCategories();
  }

  async fetchCategories(){
    try {
      const res = await this.apiMainService.fetchCategories();
      console.log(res)
      if(res){
        this.allCategories = res;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async saveCategories(){
    try {
      const categories = {
        categories:this.categoryValues.split(','),
        subCategories:this.subCategoryValues.split(',')
      }
      const res = await this.apiMainService.saveCategories(categories)
    } catch (error) {
      console.log(error)
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-b2b-food-item',
  templateUrl: './b2b-food-item.component.html',
  styleUrls: ['./b2b-food-item.component.scss']
})
export class B2bFoodItemComponent implements OnInit {
  foodItemList: any = [];
  editMode: boolean = false;
  editType: any = '';
  editfoodItemObj: any;
  searchText:any = '';

  constructor(private apiMainService: ApiMainService, private ddApiMainService:ApiMainService) { }

  ngOnInit(): void {
    this.getFooditemList();
  }

  async getFooditemList() {
    try {
      const foodItemList: any = await this.ddApiMainService.getAllB2BFooditems();
      if (foodItemList && foodItemList.length > 0) {
        this.foodItemList = foodItemList
      }
    } catch (error) {

    }
  }

  addFooditem() {
    this.editMode = true;
    this.editType = 'new';
  }

  editFoodItem($event: any) {
    this.editMode = true;
    this.editType = 'edit';
    this.editfoodItemObj = $event
  }

  gotoPreviousState($event: any) {
    if ($event !== 'cancel') {
      this.getFooditemList();
    }
    this.resetForm();
    // this.showResults = false;
    this.editMode = false;
    this.editType = '';
    this.editfoodItemObj = {};
  }

  async deleteFoodItem(item: any) {
    try {
      await this.ddApiMainService.deleteB2BFoodItem(item._id);
      this.getFooditemList();
    } catch (error) {
      console.log(error)
    }
  }

  resetForm() {

  }

}

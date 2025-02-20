import { Component, Input, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-b2b-weekly-menu',
  templateUrl: './b2b-weekly-menu.component.html',
  styleUrls: ['./b2b-weekly-menu.component.scss']
})
export class B2bWeeklyMenuComponent implements OnInit {
  @Input() orgObj: any;
  orgChoices=Array();
  orgSelected:any='';
  orgMenu: any = {
    organization_name: '',
    organizationId: '',
    mealTypeList: [
      {
        itemName: 'Breakfast',
        mealPrice: 50,
        deliveryMOQ: 10,
        deliveryCharge: 120,
        isSameDay: false,
        cutOffTime: '',
        payAmtToKitchen:0,
        deliveryTimeFrom:'',
        deliveryTimeTo:'',
        weeklyMenu: [
          {
            itemDay: 'Monday',
            itemName: '',
            itemDescription: '',
            notApplicable: false
          },
          {
            itemDay: 'Tuesday',
            itemName: '',
            itemDescription: '',
            notApplicable: false
          },
          {
            itemDay: 'Wednesday',
            itemName: '',
            itemDescription: '',
            notApplicable: false
          },
          {
            itemDay: 'Thursday',
            itemName: '',
            itemDescription: '',
            notApplicable: false
          },
          {
            itemDay: 'Friday',
            itemName: '',
            itemDescription: '',
            notApplicable: false
          },
          {
            itemDay: 'Saturday',
            itemName: '',
            itemDescription: '',
            notApplicable: false
          },
          {
            itemDay: 'Sunday',
            itemName: '',
            itemDescription: '',
            notApplicable: false
          }
        ]
      }
    ]
  }
  editMode:any = false;
  menuFound:any = false;
  showUpdate:any = false;
  Mealtypes:any=['Breakfast', 'Lunch', 'EveningSnacks', 'Dinner'];
  selctedmealtype='Breakfast';

  constructor(private ddApiMainService:ApiMainService) { 
  }

  ngOnInit(){
    this.fetchWeeklyMenu();
    this.fetchOrgChoices();
  }
  async fetchOrgChoices() {
    try {
      const orgChoices = await this.ddApiMainService.getOrgList();
      if (orgChoices && orgChoices.length > 0) {
        this.orgChoices = orgChoices;
        // console.log(orgChoices)
      }
    } catch (error) {
      console.log('cafeteria fetch error', error)
    }
  }
  async copyOrgMenu(){
    try {
      if(this.orgSelected){
        const menuItems = await this.ddApiMainService.B2BFetchWeeklyMenu(this.orgSelected);
        console.log(menuItems,"menuItems",this.orgMenu,"this.orgMenu");
        if(menuItems && menuItems._id){
          this.orgMenu.mealTypeList = JSON.parse(JSON.stringify(menuItems.mealTypeList));
          this.showUpdate=true;
          menuItems.mealTypeList.forEach((ele:any)=>{
            const acceptOrderFrom = new Date(ele.deliveryTimeFrom);
            const fromhr = acceptOrderFrom.getHours();
            const strfromhr = fromhr > 9 ? fromhr : '0' + fromhr;
            const fromMin = acceptOrderFrom.getMinutes();
            const strfromMin = fromMin > 9 ? fromMin : '0' + fromMin;
            ele.deliveryTimeFrom = strfromhr + ':' + strfromMin;
  
            const acceptOrderTill = new Date(ele.deliveryTimeTo);
            const tillhr = acceptOrderTill.getHours();
            const strtillhr = tillhr > 9 ? tillhr : '0' + tillhr;
            const tillMin = acceptOrderFrom.getMinutes();
            const strtillMin = tillMin > 9 ? tillMin : '0' + tillMin;
            ele.deliveryTimeTo = strtillhr + ':' + strtillMin;
          })
          // this.orgMenu = menuItems;
          this.menuFound = true;
          //this.showUpdate = true;
        }
        else{
          this.menuFound = false;
          this.showUpdate = false;
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  async fetchWeeklyMenu(){
    try {
      const menu = await this.ddApiMainService.B2BFetchWeeklyMenu(this.orgObj._id);
      if(menu && menu._id){
        menu.mealTypeList.forEach((ele:any)=>{
          // console.log(ele)
          const acceptOrderFrom = new Date(ele.deliveryTimeFrom);
          const fromhr = acceptOrderFrom.getHours();
          const strfromhr = fromhr > 9 ? fromhr : '0' + fromhr;
          const fromMin = acceptOrderFrom.getMinutes();
          const strfromMin = fromMin > 9 ? fromMin : '0' + fromMin;
          ele.deliveryTimeFrom = strfromhr + ':' + strfromMin;

          const acceptOrderTill = new Date(ele.deliveryTimeTo);
          const tillhr = acceptOrderTill.getHours();
          const strtillhr = tillhr > 9 ? tillhr : '0' + tillhr;
          const tillMin = acceptOrderTill.getMinutes();
          const strtillMin = tillMin > 9 ? tillMin : '0' + tillMin;
          ele.deliveryTimeTo = strtillhr + ':' + strtillMin;
        })
        this.orgMenu = menu;
        this.menuFound = true;
        //this.showUpdate = true;
      }
      else{
        this.menuFound = false;
        this.showUpdate = false;
      }
    } catch (error) {
      console.log(error)
    }
  }
  onEditClick(){
    this.editMode = !this.editMode;
    if(this.editMode){
      this.showUpdate=true;
    }else{
      this.showUpdate=false;
    }
  }
  addMeal(){
    this.orgMenu.mealTypeList.push({
      itemName: '',
      mealPrice: 0,
      deliveryMOQ: 0,
      deliveryCharge: 120,
      isSameDay: false,
      cutOffTime: '',
      payAmtToKitchen:0,
      deliveryTimeFrom:'',
      deliveryTimeTo:'',
      weeklyMenu: [
        {
          itemDay: 'Monday',
          itemName: '',
          itemDescription: '',
          notApplicable: false
        },
        {
          itemDay: 'Tuesday',
          itemName: '',
          itemDescription: '',
          notApplicable: false
        },
        {
          itemDay: 'Wednesday',
          itemName: '',
          itemDescription: '',
          notApplicable: false
        },
        {
          itemDay: 'Thursday',
          itemName: '',
          itemDescription: '',
          notApplicable: false
        },
        {
          itemDay: 'Friday',
          itemName: '',
          itemDescription: '',
          notApplicable: false
        },
        {
          itemDay: 'Saturday',
          itemName: '',
          itemDescription: '',
          notApplicable: false
        },
        {
          itemDay: 'Sunday',
          itemName: '',
          itemDescription: '',
          notApplicable: false
        }
      ]
    })
    console.log(this.orgMenu)
  }

  async submit(){
    this.update();
    try {
      this.orgMenu.mealTypeList.forEach((meal:any)=>{
        meal.deliveryTimeFrom = new Date((new Date().toDateString() + ' ' + meal.deliveryTimeFrom));
        meal.deliveryTimeTo = new Date((new Date().toDateString() + ' ' + meal.deliveryTimeTo));
      })
      this.orgMenu.organizationId = this.orgObj._id;
      this.orgMenu.organization_name = this.orgObj.organization_name;
      const menu = await this.ddApiMainService.B2BweeklyMenuAdd(this.orgMenu);
      if(menu && menu._id){
        this.orgMenu = menu;
        //this.showUpdate = true;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update(){
    console.log(this.orgMenu,"this.orgMenu",this.orgObj);
    try {
      this.orgMenu.mealTypeList.forEach((meal:any)=>{
        meal.deliveryTimeFrom = new Date((new Date().toDateString() + ' ' + meal.deliveryTimeFrom));
        meal.deliveryTimeTo = new Date((new Date().toDateString() + ' ' + meal.deliveryTimeTo));
      })
      if(typeof this.orgMenu.organizationId==='undefined'|| this.orgMenu.organizationId == null || this.orgMenu.organizationId == ''){
        this.orgMenu.organizationId=this.orgObj._id;
        this.orgMenu.organization_name=this.orgObj.organization_name;
      }
      const menu = await this.ddApiMainService.updateWeeklyMenuItem(this.orgMenu,this.orgMenu.organizationId);
      if(menu && menu._id){
        menu.mealTypeList.forEach((ele:any)=>{
          // console.log(ele)
          const acceptOrderFrom = new Date(ele.deliveryTimeFrom);
          const fromhr = acceptOrderFrom.getHours();
          const strfromhr = fromhr > 9 ? fromhr : '0' + fromhr;
          const fromMin = acceptOrderFrom.getMinutes();
          const strfromMin = fromMin > 9 ? fromMin : '0' + fromMin;
          ele.deliveryTimeFrom = strfromhr + ':' + strfromMin;

          const acceptOrderTill = new Date(ele.deliveryTimeTo);
          const tillhr = acceptOrderTill.getHours();
          const strtillhr = tillhr > 9 ? tillhr : '0' + tillhr;
          const tillMin = acceptOrderTill.getMinutes();
          const strtillMin = tillMin > 9 ? tillMin : '0' + tillMin;
          ele.deliveryTimeTo = strtillhr + ':' + strtillMin;
        })
        this.orgMenu = menu;
        this.showUpdate = false;
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteItem(index:any){
    this.orgMenu.mealTypeList.splice(index,1);
    this.showUpdate= true;
  }

}

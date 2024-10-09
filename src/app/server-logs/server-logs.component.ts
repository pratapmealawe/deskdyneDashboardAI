import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-server-logs',
  templateUrl: './server-logs.component.html',
  styleUrls: ['./server-logs.component.scss']
})
export class ServerLogsComponent {
  selectedStatus:string = '';
  selectedDBStatus:string = '';
  serverLogsList = [];
  access:any;
  startDate: any;
  endDate: any;
  hours: any;
  logsList:any=[];

  constructor(private apiMainService: ApiMainService,public router: Router, private policyService:PolicyService) {
    this.access = this.policyService.getCurrentButtonPolicy();
  }
  async getServerLogs(selectedStatus:string,fileName:string){
      try{
        this.serverLogsList=[];
        this.logsList = [];
        this.selectedStatus = selectedStatus;
        this.selectedDBStatus = '';
        const serverLogs = await this.apiMainService.getServerLogs(fileName);
        if(serverLogs){
          this.serverLogsList = serverLogs.split('\n').reverse();
        }
      }catch(error){
          console.log('getServerLogs error ',error)
      }
  }
  getMLDBLogs(){
    this.serverLogsList=[];
    this.logsList = [];
    this.selectedDBStatus = '';
    this.selectedStatus = 'DBLogs'
  }

  async getLineBasedLogs(selectedLines: any) {
    this.selectedDBStatus = selectedLines;
    this.logsList.length=0;
    try {
        const selectedLine = parseInt(selectedLines);
        this.logsList= await this.apiMainService.getLineBasedLogs(selectedLine);
       
       this.logsList.forEach((element:any) => {
        element.timestamp = new Date(element.timestamp);
       });
        console.log('loglist object',this.logsList);
    } catch (error) {
        console.log(error)
    }
}
async getTimeBasedLogs(selectedTime:string){
  try{
   this.logsList.length=0;
    this.selectedDBStatus = selectedTime;
    if(selectedTime=='1Day'){
      this.hours=24;
    }else if(selectedTime=='2Day'){
        this.hours=48;
    }else{
        this.hours = parseInt(selectedTime.split('')[0]);
    }

    this.logsList = await this.apiMainService.getTimeBasedLogs(this.hours); 
    this.logsList.forEach((element:any) => {
    element.timestamp = new Date(element.timestamp);
  });
  }catch(error){
      console.log('getServerLogs error ',error)
  }
}
async getDayRangeBasedLogs(startDate: any, endDate: any) {
    let sDate = new Date(startDate);
    let eDate = new Date(endDate)
    try {
        this.logsList.length = 0 ;
        this.logsList = await this.apiMainService.getDayRangeBasedLogs(startDate, endDate);
        //   for(let obj of dayBasedLogs){
        //     for(let key in obj){
        //         this.logsList.push(obj[key])
        //     }
        // }
      this.logsList.forEach((element:any) => {
        element.timestamp = new Date(element.timestamp);
      });
    } catch (error) {
        console.log(error)
    }
}

  goBack(){
    this.router.navigate(['/home/miscellaneous']);
  }

}

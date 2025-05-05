import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-server-logs',
  templateUrl: './server-logs.component.html',
  styleUrls: ['./server-logs.component.scss']
})
export class ServerLogsComponent {
  @ViewChild("contentPayload") contentPayload: any;
  selectedStatus:string = '';
  selectedDBStatus:string = '';
  serverLogsList = [];
  access:any;
  startDate: any;
  endDate: any;
  hours: any;
  logsList:any=[];
  logPayload:any = '';

  constructor(private apiMainService: ApiMainService,public router: Router, private policyService:PolicyService,
    private modalService: NgbModal
  ) {
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

  
  getAuditLogs(){
    this.serverLogsList=[];
    this.logsList = [];
    this.selectedDBStatus = '';
    this.selectedStatus = 'AuditLogs'
  }

  async getLineBasedLogs(selectedLines: any) {
    this.selectedDBStatus = selectedLines;
    this.logsList.length=0;
    try {
        const selectedLine = parseInt(selectedLines);
        this.logsList= await this.apiMainService.getLineBasedLogs(selectedLine);
       
       this.logsList.forEach((element:any) => {
        element.timestamp = new Date(element.timestamp);
        element.logObj = JSON.stringify(element.logObj);
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
    console.log('loglist object',this.logsList);
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
        this.logsList.forEach((element:any) => {
          element.timestamp = new Date(element.timestamp);
        });
        console.log('loglist object',this.logsList);
    } catch (error) {
        console.log(error)
    }
}

async getLineBasedAuditLogs(selectedLines: any) {
  this.selectedDBStatus = selectedLines;
  this.logsList.length=0;
  try {
      const selectedLine = parseInt(selectedLines);
      this.logsList= await this.apiMainService.getLineBasedAuditLogs(selectedLine);       
     this.logsList.forEach((element:any) => {
      element.timestamp = new Date(element.timestamp);
     });
      console.log('loglist object',this.logsList);
  } catch (error) {
      console.log(error)
  }
}
async getTimeBasedAuditLogs(selectedTime:string){
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

  this.logsList = await this.apiMainService.getTimeBasedAuditLogs(this.hours); 
  this.logsList.forEach((element:any) => {
    element.timestamp = new Date(element.timestamp);
  });
  console.log('loglist object',this.logsList);
}catch(error){
    console.log('getServerLogs error ',error)
}
}

async getDayRangeBasedAuditLogs(startDate: any, endDate: any) {
  let sDate = new Date(startDate);
  let eDate = new Date(endDate)
  try {
      this.logsList.length = 0 ;
      this.logsList = await this.apiMainService.getDayRangeBasedAuditLogs(startDate, endDate);   
      this.logsList.forEach((element:any) => {
        element.timestamp = new Date(element.timestamp);
      });
      console.log('loglist object',this.logsList);
  } catch (error) {
      console.log(error)
  }
}

payloadView(paylaod:any){
  this.logPayload = JSON.stringify(paylaod);
  const modalRef = this.modalService.open(this.contentPayload, { ariaLabelledBy: 'modal-basic-title', size: 'xl', windowClass: 'menuModel' });
    modalRef.result.then(() => {  }, () => {});
}

  goBack(){
    this.router.navigate(['/home/miscellaneous']);
  }

}

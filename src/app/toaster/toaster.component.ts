import { Component } from '@angular/core';
import { ToasterService } from './toaster.service';


@Component({
  selector: 'app-toaster',
  templateUrl: 'toaster.component.html',
  styleUrls: ['toaster.component.scss']
})
export class ToasterComponent{
    showToster: boolean = false;
    type: string = '';
    msg: string = '';
    timeoutCounter:any;
    constructor(private toasterService: ToasterService) {
      this.toasterService.toasterSubject.subscribe((toasterObj: any) => {
            if(toasterObj){
                this.showToster = true;
                this.type = toasterObj.type;
                this.msg = toasterObj.msg;
                this.clearToaster(this.type);
            }
        });
    }
    clearToaster(type:string){
        try{
            if(type === 'alarm'){
                var audio = new Audio('assets/push_notification.wav');            
                if(this.timeoutCounter){
                    clearTimeout(this.timeoutCounter);
                }
                this.timeoutCounter = setTimeout(()=>{
                    this.showToster = false;
                },30000);
                audio.play();
            }else{
                if(this.timeoutCounter){
                    clearTimeout(this.timeoutCounter);
                }
                this.timeoutCounter = setTimeout(()=>{
                    this.showToster = false;
                },5000);
            }
        }catch(error){
            console.log('error on clearToaster ',error);
        }
                
    }

    hideMsg(){
        if(this.timeoutCounter){
            clearTimeout(this.timeoutCounter);
        };
        this.showToster = false;
    }
}
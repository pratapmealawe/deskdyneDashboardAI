import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
  export class WebNotificationService {
    constructor(){
        
    }
    async requestPermission(){
        try{
            const permission = await Notification.requestPermission();
            console.log('permission',permission)
        }catch(error){
            console.log('Error while requestPermission ',error)
        }
    }

    showNotification(msg:string){
        try{
            new Notification(msg);
        }catch(error){
            console.log('Error while showNotification ',error)
        } 
    }
  }

import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Loader, LoaderOptions } from 'google-maps';

// tslint:disable-next-line:class-name
declare interface google {
    maps: typeof google.maps;
}

@Injectable({
    providedIn: 'root'
  })
  export class GoogleMapService {
    private  options: LoaderOptions = {libraries:  ['places','drawing','geometry']};
    private  google: any;
    private center: any;
    private apiKey = environment.googleAPIkey;
    googleQueue:any = [];
    callInProgess = false;

    constructor() {
       }

    private async  loadGoogleMap(){      
        const loader = new Loader(this.apiKey, this.options);
        return await loader.load();      
    }

    private async getCurrentPosition() {
        return new Promise(async (resolve, reject) => {
            try{
                navigator.geolocation.getCurrentPosition((coordinates)=>{
                    resolve(coordinates);
                }, reject);
            }catch (e){
                reject(e);
            }
        });
    }

    getGoogle(): Promise<google>{
        return new Promise(async (resolve, reject) => {
            try{
                if(this.google){
                    resolve(this.google);
                }else{
                    this.googleQueue.push(resolve);
                    if(!this.callInProgess){
                        this.callInProgess = true;
                        this.google = await this.loadGoogleMap();
                        this.googleQueue.forEach((savedResolve:any) => {
                            savedResolve(this.google);
                        });
                        this.googleQueue = [];
                        this.callInProgess = false;
                    }                 
                }
            }catch (e){
                reject(e);
            }
        });
    }

    getCenter(){
        return new Promise(async (resolve, reject) => {
            try{
                this.center = await this.getCurrentPosition();                
                resolve(this.center);
            }catch (e){
                reject(e);
            }
        });
    }

    formatAddress(place:any){
        return {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };
    }
  }

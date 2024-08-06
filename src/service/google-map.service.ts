import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { Loader, LoaderOptions } from 'google-maps';
import { ApiMainService } from './apiService/apiMain.service';

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
    directionsService:any;
    googleQueue:any = [];
    callInProgess = false;
    constructor(private apiMainService: ApiMainService) {
       }

    private async  loadGoogleMap(){      
        const loader = new Loader(this.apiKey, this.options);
        return await loader.load();      
    }

    private async getCurrentPosition() {
        return new Promise(async (resolve, reject) => {
            try{
                navigator.geolocation.getCurrentPosition((coordinates)=>{
                    console.log('$$$$$$$',coordinates)
                    resolve({lat: coordinates.coords.latitude, lng: coordinates.coords.longitude})
                });            
            }catch (e){
                console.log('error while fetching current position ', e);
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
                    console.log('loading google queue');
                    this.googleQueue.push(resolve);
                    if(!this.callInProgess){
                        this.callInProgess = true;
                        console.log('loading google api');
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

    async getClusterName(latLngObj:any){
        return new Promise(async (resolve, reject)=>{
            try{
                if(!this.google){
                    await this.getGoogle();
                }
                // const geoFencinglist:any = await this.apiMainService.getGeoFencingList();
                const geoFencinglist:any = [];
                const mappedClusterList:any = []
                if(geoFencinglist && geoFencinglist.length > 0){
                    if(!this.google){
                        await this.getGoogle();
                    }
                    let clusterFound = false;
                    geoFencinglist.forEach((cluster:any) =>{
                        clusterFound = this.google.maps.geometry.poly.containsLocation(
                            new this.google.maps.LatLng(latLngObj.lat, latLngObj.lng),
                            new google.maps.Polygon({
                                paths: [ [...cluster.clusterCoordinates]]
                            })
                        );
                        console.log('Is new position inside fencing ', clusterFound, cluster);
                        if(clusterFound){
                            mappedClusterList.push(cluster.clusterId);
                        }
                    });                   
                }
                resolve(mappedClusterList);                
            }catch(error){
              console.log('error while fetching geo fencing list ',error);
              reject(error);
            }
        });       
    }

    getKitchenDistance(kitchenObj:any, centerA:any){        
        const self = this;
        return new Promise(async (resolve,reject)=>{
            let distanceInKms = 1;
            if(!this.google){
               await this.getGoogle(); 
            }
            if(this.google && this.google.maps){
                if(!this.directionsService){
                    this.directionsService = new google.maps.DirectionsService;
                }
                let distanceInMeters = this.google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(centerA),
                    new google.maps.LatLng(kitchenObj.geolocation)
                );
                if(this.directionsService && this.directionsService.route){
                    this.directionsService.route({
                        origin: centerA,
                        destination: kitchenObj.geolocation,
                        provideRouteAlternatives: true,
                        avoidTolls: true,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function(response:any, status:any) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            try{
                                console.log('response',response);
                                distanceInMeters = response.routes[0].legs[0].distance.value;
                                distanceInKms = parseFloat((distanceInMeters * 0.001).toFixed(1));
                                kitchenObj.distance = distanceInKms;  
                                kitchenObj.deliveryTime = Math.ceil(distanceInKms * 5) + 10;
                                resolve(kitchenObj);
                            }catch(e){
                                distanceInKms = parseFloat((distanceInMeters * 0.001).toFixed(1));
                                kitchenObj.distance = distanceInKms;  
                                kitchenObj.deliveryTime = Math.ceil(distanceInKms * 5) + 10;
                                resolve(kitchenObj); 
                            }                    
                        }
                        else {
                            distanceInKms = parseFloat((distanceInMeters * 0.001).toFixed(1));
                            kitchenObj.distance = distanceInKms;  
                            kitchenObj.deliveryTime = Math.ceil(distanceInKms * 5) + 10; 
                            console.log('calculating distance 3');
                            resolve(kitchenObj);  
                        }
                    }); 
                }else{
                    console.log('calculating distance')
                    distanceInKms = parseFloat((distanceInMeters * 0.001).toFixed(1));
                    kitchenObj.distance = distanceInKms;  
                    kitchenObj.deliveryTime = Math.ceil(distanceInKms * 15); 
                    console.log('calculating distance 4');
                    resolve(kitchenObj); 
                }
                           
            }else{
                const distance = this.getPerpendicularDistance(kitchenObj.geolocation.lat,kitchenObj.geolocation.lng,centerA.lat,centerA.lng) 
                kitchenObj.distance = distance;  
                kitchenObj.deliveryTime = Math.ceil(distance * 15); 
                resolve(kitchenObj); 
            }
        });      
    }
    getPerpendicularDistance(lat1:any, lon1:any, lat2:any, lon2:any, unit="K") {
        console.log('getPerpendicularDistance',lat1, lon1, lat2, lon2)
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return parseFloat(dist.toFixed(1));
        }
    }
  }

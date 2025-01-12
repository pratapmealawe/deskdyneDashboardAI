import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleStyle } from 'src/config/google.style.config';
import { GoogleMapService } from 'src/service/google-map.service';

@Component({
  selector: 'app-set-geolocation',
  templateUrl: './set-geolocation.component.html',
  styleUrls: ['./set-geolocation.component.scss']
})
export class SetGeolocationComponent implements OnInit {
  google: any;
   map: any;
   bermudaTriangle: any;
   mapid = 'map1234';
   location: string = '';
   latlng: any;
   searchText: string = '';
   @Output() sendLocation = new EventEmitter();
   @Input()selectedCenter:any;
  constructor(private googleMapService: GoogleMapService,
              private chgDetRef: ChangeDetectorRef) {
        this.mapid += Math.round(Math.random() * 1000);
   }
   ngOnInit() {
      setTimeout(( ) => {
          this.init(this.selectedCenter&&this.selectedCenter.lat&&this.selectedCenter.lng?this.selectedCenter:null);
      }, 500 );
     }
   async init(selectedLatLng:any){
    const center =selectedLatLng ? selectedLatLng : await this.googleMapService.getCenter();
    this.google = await this.googleMapService.getGoogle();
    this.loadSelectedLocation(center);
    this.findMySearchAddress(center);
   }
   async loadSelectedLocation(selectedCenter:any){
    try{      
      const center = selectedCenter ? selectedCenter : await this.googleMapService.getCenter();

      const map = new this.google.maps.Map(document.getElementById(this.mapid), {
          center,
          disableDefaultUI: true,
          mapTypeId: this.google.maps.MapTypeId.ROADMAP,
          styles: GoogleStyle
      });
      map.setCenter(center);
      const mapbounds = new this.google.maps.LatLngBounds();
      mapbounds.extend(new this.google.maps.LatLng(center.lat + 0.1, center.lng + 0.1));
      mapbounds.extend(new this.google.maps.LatLng(center.lat - 0.1, center.lng - 0.1));
      // this.google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
      //   const bounds = map.getBounds();
      //   const NE = bounds.getNorthEast();
      //   const SW = bounds.getSouthWest();
      //   console.log('bounds' , NE.lat(), NE.lng(), SW.lat(), SW.lng());
      // });
      setTimeout(() => {
        map.setZoom(19);
        this.placeMarker(center, map);
        this.findMarkerAddress(center);
      }, 1000);
    }catch (e){
      console.log('error while fetching coordinates ', e);
    }
   }

  placeMarker(latlngObj:any, map:any){
    const marker = new this.google.maps.Marker({
      position: latlngObj,
      map,
      // icon: '/assets/images/googleMarker.gif',
      optimized: false
    });
    map.addListener('drag', (event:any) => {
      marker.setPosition( map.getCenter());
    });
    map.addListener('dragend', (event:any) => {
      console.log(event, marker);
      const lat = marker.map.center.lat();
      const lng  = marker.map.center.lng();
      const newLatlng = { lat, lng};
      console.log(newLatlng);
      this.findMarkerAddress(newLatlng);
      // const resultColor = this.google.maps.geometry.poly.containsLocation(
      //   new this.google.maps.LatLng(lat, lng),
      //   this.bermudaTriangle
      // );
      // console.log('Is new position inside fencing ', resultColor);
    });
  }
  findMarkerAddress(latlng:any){
    const geocoder = new this.google.maps.Geocoder();
    geocoder.geocode( { location: latlng }, (
      results: google.maps.GeocoderResult[],
      status: google.maps.GeocoderStatus
    ) => {
      if (status === 'OK') {
        if (results[0]) {
         console.log(results[0].formatted_address);
         this.location = results[0].formatted_address.replace("Unnamed Road, ","");       
         this.latlng = latlng;
         this.sendLocation.emit({location:this.location,latlng: this.latlng});
         this.chgDetRef.detectChanges();
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  findMyAddress(center:any, map:any){    
    const input = document.getElementById('pac-input') as HTMLInputElement;
    const options = {};
    const autocomplete = new this.google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place, place.name);
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: \'' + place.name + '\'');
        return;
      }
      let fullAddress = '';
      for (const component of place.address_components as google.maps.GeocoderAddressComponent[]){
        fullAddress += `${component.long_name} `;
      }
      console.log(fullAddress);
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    });
  }

  geofencing(map:any){
    const triangleCoords = [
      {lat: 18.507468667195393, lng: 73.66268708465577},
      {lat: 18.50717023083026, lng: 73.66375996842544},
      {lat: 18.506546225614134, lng: 73.66353108631665},
      {lat: 18.506898924818056, lng: 73.66234376157445},
      {lat: 18.507468667195393, lng: 73.66268708465577}
    ];
    const triangleCoords1 = [
      {lat: 18.50734657956969, lng: 73.664332172797},
      {lat: 18.507034577877903, lng: 73.66573407401484},
      {lat: 18.508675973679154, lng: 73.66497590287872},
      {lat: 18.50734657956969, lng: 73.664332172797}
    ];
    this.bermudaTriangle = new google.maps.Polygon({
      paths: [ triangleCoords, triangleCoords1],
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });
    this.bermudaTriangle.setMap(map);
  }

  updateLocation(address:any){
    if (address && address.lat && address.lng){
        this.loadSelectedLocation({lat: parseFloat(address.lat), lng: parseFloat(address.lng)});
    }else{
      this.loadSelectedLocation(null);
    }
  }


  goToCurrentLocation(){
    this.searchText = '';
    this.loadSelectedLocation(null);
  }
  findMySearchAddress(center:any){
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };
    const options = {};
    const input = document.getElementById('searchLocation') as HTMLInputElement;
    const autocomplete = new this.google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place, place.name);
      if (!place.geometry || !place.geometry.location) {
        console.log('No details available for input: \'' + place.name + '\'');
        return;
      }
      const address = this.googleMapService.formatAddress(place);
      console.log('updateLocation',address);
      this.updateLocation(address);
    });
  }


}

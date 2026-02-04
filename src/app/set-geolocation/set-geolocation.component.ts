import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GoogleStyle } from 'src/config/google.style.config';
import { GoogleMapService } from 'src/service/google-map.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-geolocation',
  templateUrl: './set-geolocation.component.html',
  styleUrls: ['./set-geolocation.component.scss']
})
export class SetGeolocationComponent implements OnInit, AfterViewInit {
  google: any;
  map: any;
  bermudaTriangle: any;
  mapid = 'map1234';
  location: string = '';
  latlng: any;
  searchText: string = '';

  selectedLocationData: any = null;
  private mapInstance: any = null;
  private autocompleteInstance: any = null;

  @ViewChild('searchLocationInput') searchLocationInput!: ElementRef;

  constructor(
    private googleMapService: GoogleMapService,
    private chgDetRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<SetGeolocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mapid += Math.round(Math.random() * 1000);
  }

  ngOnInit() {
    // Logic handled in AfterViewInit
  }

  ngAfterViewInit() {
    // delay slightly to ensure dialog rendering
    setTimeout(() => {
      const center = this.data && this.data.selectedCenter && this.data.selectedCenter.lat ? this.data.selectedCenter : null;
      this.init(center);
    }, 200);
  }

  async init(selectedLatLng: any) {
    const center = selectedLatLng ? selectedLatLng : await this.googleMapService.getCenter();
    this.google = await this.googleMapService.getGoogle();
    this.loadSelectedLocation(center);
    this.findMySearchAddress(center);
  }

  async loadSelectedLocation(selectedCenter: any) {
    try {
      const center = selectedCenter ? selectedCenter : await this.googleMapService.getCenter();

      const mapElement = document.getElementById(this.mapid);
      if (!mapElement) return;

      const map = new this.google.maps.Map(mapElement, {
        center,
        disableDefaultUI: true,
        mapTypeId: this.google.maps.MapTypeId.ROADMAP,
        styles: GoogleStyle
      });
      map.setCenter(center);
      this.mapInstance = map; // Store reference for autocomplete binding

      const mapbounds = new this.google.maps.LatLngBounds();
      mapbounds.extend(new this.google.maps.LatLng(center.lat + 0.1, center.lng + 0.1));
      mapbounds.extend(new this.google.maps.LatLng(center.lat - 0.1, center.lng - 0.1));

      setTimeout(() => {
        map.setZoom(19);
        this.placeMarker(center, map);
        this.findMarkerAddress(center);
      }, 500);
    } catch (e) {
      console.log('error while fetching coordinates ', e);
    }
  }

  placeMarker(latlngObj: any, map: any) {
    const marker = new this.google.maps.Marker({
      position: latlngObj,
      map,
      optimized: false,
      draggable: true // Ensure it is draggable
    });

    // Update marker on drag end
    map.addListener('drag', () => {
      marker.setPosition(map.getCenter());
    });

    map.addListener('dragend', () => {
      const lat = map.getCenter().lat();
      const lng = map.getCenter().lng();
      const newLatlng = { lat, lng };
      this.findMarkerAddress(newLatlng);
    });

    // Also allow dragging the marker itself specifically if needed, but centering map is usually preferred behavior on mobile/web hybrid
    marker.addListener('dragend', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newLatlng = { lat, lng };
      this.findMarkerAddress(newLatlng);
      map.setCenter(newLatlng);
    });
  }

  findMarkerAddress(latlng: any) {
    const geocoder = new this.google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, (
      results: google.maps.GeocoderResult[],
      status: google.maps.GeocoderStatus
    ) => {
      if (status === 'OK') {
        if (results[0]) {
          console.log(results[0].formatted_address);
          this.location = results[0].formatted_address.replace("Unnamed Road, ", "");
          this.latlng = latlng;

          this.selectedLocationData = { location: this.location, latlng: this.latlng };
          this.chgDetRef.detectChanges();
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  // This method is removed as per the target code.
  // findMyAddress(center:any, map:any){    
  //   const input = document.getElementById('pac-input') as HTMLInputElement;
  //   const options = {};
  //   const autocomplete = new this.google.maps.places.Autocomplete(input, options);
  //   autocomplete.bindTo('bounds', map);
  //   const marker = new google.maps.Marker({
  //     map,
  //     anchorPoint: new google.maps.Point(0, -29),
  //   });
  //   autocomplete.addListener('place_changed', () => {
  //     const place = autocomplete.getPlace();
  //     console.log(place, place.name);
  //     if (!place.geometry || !place.geometry.location) {
  //       // User entered the name of a Place that was not suggested and
  //       // pressed the Enter key, or the Place Details request failed.
  //       window.alert('No details available for input: \'' + place.name + '\'');
  //       return;
  //     }
  //     let fullAddress = '';
  //     for (const component of place.address_components as google.maps.GeocoderAddressComponent[]){
  //       fullAddress += `${component.long_name} `;
  //     }
  //     console.log(fullAddress);
  //     // If the place has a geometry, then present it on a map.
  //     if (place.geometry.viewport) {
  //       map.fitBounds(place.geometry.viewport);
  //     } else {
  //       map.setCenter(place.geometry.location);
  //       map.setZoom(17);
  //     }
  //     marker.setPosition(place.geometry.location);
  //     marker.setVisible(true);
  //   });
  // }

  geofencing(map: any) {
    const triangleCoords = [
      { lat: 18.507468667195393, lng: 73.66268708465577 },
      { lat: 18.50717023083026, lng: 73.66375996842544 },
      { lat: 18.506546225614134, lng: 73.66353108631665 },
      { lat: 18.506898924818056, lng: 73.66234376157445 },
      { lat: 18.507468667195393, lng: 73.66268708465577 }
    ];
    const triangleCoords1 = [
      { lat: 18.50734657956969, lng: 73.664332172797 },
      { lat: 18.507034577877903, lng: 73.66573407401484 },
      { lat: 18.508675973679154, lng: 73.66497590287872 },
      { lat: 18.50734657956969, lng: 73.664332172797 }
    ];
    this.bermudaTriangle = new google.maps.Polygon({
      paths: [triangleCoords, triangleCoords1],
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });
    this.bermudaTriangle.setMap(map);
  }

  updateLocation(address: any) {
    if (address && address.lat && address.lng) {
      this.loadSelectedLocation({ lat: parseFloat(address.lat), lng: parseFloat(address.lng) });
    } else {
      this.loadSelectedLocation(null);
    }
  }

  goToCurrentLocation() {
    this.searchText = '';
    this.loadSelectedLocation(null);
  }

  findMySearchAddress(center: any) {
    // Wait a bit for the DOM to fully render with Material form field
    setTimeout(() => {
      this.initAutocomplete(center);
    }, 300);
  }

  private initAutocomplete(center: any) {
    if (this.autocompleteInstance) {
      // Already initialized
      return;
    }

    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };

    const options = {
      bounds: defaultBounds,
      strictBounds: false,
      fields: ['geometry', 'formatted_address', 'name'],
      componentRestrictions: { country: 'in' } // Restrict to India for better results
    };

    // Try to get the input element - handle both native and Material input scenarios
    let input: HTMLInputElement | null = null;

    if (this.searchLocationInput?.nativeElement) {
      // For matInput, the nativeElement IS the input element directly
      input = this.searchLocationInput.nativeElement;
    }

    if (!input) {
      // Fallback: try to find by ID
      input = document.getElementById('searchLocation') as HTMLInputElement;
    }

    if (!input) {
      console.warn('Search input not found for autocomplete');
      return;
    }

    try {
      const autocomplete = new this.google.maps.places.Autocomplete(input, options);
      this.autocompleteInstance = autocomplete;

      // Bind to map if available for better bounds biasing
      if (this.mapInstance) {
        autocomplete.bindTo('bounds', this.mapInstance);
      }

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          console.log('No details available for input: \'' + place.name + '\'');
          return;
        }

        const address = {
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        this.searchText = place.formatted_address || place.name;
        this.updateLocation(address);
      });
    } catch (error) {
      console.error('Failed to initialize autocomplete:', error);
    }
  }

  confirmSelection() {
    this.dialogRef.close(this.selectedLocationData);
  }

  close() {
    this.dialogRef.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { UtilityService } from 'src/service/utility.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  admin: any;
  clientLogos: string[] = [
    'assets/clients/Awfis.png',
    'assets/clients/Bootstart.png',
    'assets/clients/Bridgestone.png',
    'assets/clients/CLSA.png',
    'assets/clients/CoinDCX.png',
    'assets/clients/Confluxsys.png',
    'assets/clients/Cradlewise.png',
    'assets/clients/Credit Suisse.png',
    'assets/clients/Finzly.png',
    'assets/clients/Flytbase.png',
    'assets/clients/Godrej Properties.png',
    'assets/clients/Metta Social.png',
    'assets/clients/Ordway.png',
    'assets/clients/Poonawalla Fincorp.png',
    'assets/clients/Rakuten.png',
    'assets/clients/Solar Square.png',
    'assets/clients/SpringUp Labs.png',
    'assets/clients/Sunbrilo.png',
    'assets/clients/Thermax.png',
    'assets/clients/Trios.png',
    'assets/clients/Vilas Javdekar.png',
    'assets/clients/ZS Associates.png',
    'assets/clients/Zinnov.png',
    'assets/clients/kolte_patil.png'
  ];

  imageUrl: string = environment.imageUrl;
  carouselImages: any[] = [];

  constructor(private router: Router, private apiMainService: ApiMainService, private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService, private utilityService: UtilityService, private offcanvasService: NgbOffcanvas) {

  }

  async ngOnInit() {
    // this.admin =  this.localStorageService.getCacheData('ADMIN_PROFILE') ;

    // if(this.admin?.role === "ADMIN") {
    //   this.router.navigate(["/dashboard"])
    // } else {
    //   this.router.navigate(["/orgDashboard"])
    // }

    await this.fetchCarouselImages();
  }

  async fetchCarouselImages() {
    try {
      const res: any = await this.apiMainService.getImageGroupConfigByName("dashoard_home");
      console.log(res);

      if (res) {
        this.carouselImages = res.imageData;
      }
      // Fallback/Demo structure if API is not yet ready or empty
      if (!this.carouselImages.length) {
        // console.warn("No specific carousel images found, using placeholders if needed.");
      }
    } catch (error) {
      console.error("Error fetching carousel images", error);
    }
  }

  hideClientLogo(event: any) {
    // Hide the column (grandparent of img -> div.logo-wrapper -> div.col...)
    // Structure: div.col... > div.logo-wrapper > img
    const imgElement = event.target as HTMLElement;
    const wrapper = imgElement.parentElement; // div.logo-wrapper
    const col = wrapper?.parentElement; // div.col-6...
    if (col) {
      col.style.display = 'none';
      if (col.parentElement && col.parentElement.children.length === 1) {
        // Optional: hide row if no logos? But difficult to track live
      }
    }
  }

}

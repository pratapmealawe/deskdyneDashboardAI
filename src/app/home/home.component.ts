import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ]
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
    'assets/clients/Fizly.png',
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
  chunkedImages: any[][] = [];

  constructor(private apiMainService: ApiMainService) {

  }

  async ngOnInit() {
    await this.fetchCarouselImages();
  }

  async fetchCarouselImages() {
    try {
      const res: any = await this.apiMainService.getImageGroupConfigByName("dashoard_home");

      if (res && res.imageData) {
        this.carouselImages = res.imageData;
        this.chunkedImages = this.chunkArray(this.carouselImages, 4);
      }
      if (!this.carouselImages.length) {
      }
    } catch (error) {
      console.error("Error fetching carousel images", error);
    }
  }

  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  hideClientLogo(event: any) {
    const imgElement = event.target as HTMLElement;
    const wrapper = imgElement.parentElement;
    const col = wrapper?.parentElement;
    if (col) {
      col.style.display = 'none';
      if (col.parentElement && col.parentElement.children.length === 1) {
      }
    }
  }

}

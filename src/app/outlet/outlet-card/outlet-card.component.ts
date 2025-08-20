import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-outlet-card',
  templateUrl: './outlet-card.component.html',
  styleUrls: ['./outlet-card.component.scss'],
})
export class OutletCardComponent implements OnInit, OnChanges {
  @Input() outlet: any;
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;
  filteredMenuList: any;
  constructor(private policyService: PolicyService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.outlet);

  }
  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    console.log('heyyy');

    this.filteredMenuList = [...this.outlet.outletList].sort(
      (a, b) => (a.precedence || 0) - (b.precedence || 0)
    );

  }

  vieworg(org: any) {
    this.view.emit(org);
  }
}

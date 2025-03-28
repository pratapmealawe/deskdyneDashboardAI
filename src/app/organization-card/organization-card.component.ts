import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
})
export class OrganizationCardComponent implements OnInit {
  @Input() organization: any;
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  btnPolicy: any;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  vieworg(org: any) {
    this.view.emit(org);
  }
}

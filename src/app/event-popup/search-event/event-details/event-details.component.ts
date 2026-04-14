import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  @Input() eventObj: any;
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;

  constructor(
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private policyService: PolicyService
  ) {
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  editOrg() {
    this.runtimeStorageService.setCacheData('EVENTPOPUP_EDIT', this.eventObj);
    this.router.navigate(['/app/addEventPopup']);
  }

}

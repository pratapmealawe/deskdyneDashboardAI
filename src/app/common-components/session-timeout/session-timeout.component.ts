import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../service/local-storage.service';
import { RuntimeStorageService } from '../../../service/runtime-storage.service';
import { SessionTimeoutService } from '../../../service/session-timeout.service';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-session-timeout',
    templateUrl: './session-timeout.component.html',
    styleUrls: ['./session-timeout.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class SessionTimeoutComponent implements OnInit {
    showDialog = false;

    constructor(
        private sessionTimeoutService: SessionTimeoutService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private runtimeStorageService: RuntimeStorageService
    ) { }

    ngOnInit(): void {
        this.sessionTimeoutService.sessionTimeoutState$.subscribe(() => {
            this.showDialog = true;
        });
    }

    confirm() {
        this.showDialog = false;
        this.localStorageService.resetAllCacheData();
        this.runtimeStorageService.resetAllCacheData();
        this.router.navigate(['/login']);
    }
}

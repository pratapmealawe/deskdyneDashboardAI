import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionTimeoutService {
    private sessionTimeoutSubject = new Subject<void>();
    sessionTimeoutState$ = this.sessionTimeoutSubject.asObservable();

    constructor() { }

    showSessionTimeoutModal() {
        this.sessionTimeoutSubject.next();
    }
}

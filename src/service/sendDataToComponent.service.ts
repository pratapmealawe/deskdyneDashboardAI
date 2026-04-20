import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SendDataToComponent {
    jsonObj: any = {};

    subscribe(key: string, callback: (args: any) => void) {
        if (!this.jsonObj[key]) {
            this.jsonObj[key] = new BehaviorSubject(null);
            this.jsonObj[key].subscribe(callback);
        }
    }
    publish(key: string, data: any) {
        if (this.jsonObj[key] && data) {
            this.jsonObj[key].next(data);
        }
    }

    unsubscribe(key: string) {
        if (this.jsonObj[key]) {
            this.jsonObj[key].unsubscribe();
            delete this.jsonObj[key];
        }
    }

}

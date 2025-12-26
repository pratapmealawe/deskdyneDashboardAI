import { Component } from '@angular/core';
import { ToasterService } from './toaster.service';


@Component({
    selector: 'app-toaster',
    templateUrl: 'toaster.component.html',
    styleUrls: ['toaster.component.scss']
})
export class ToasterComponent {
    toasts: any[] = [];

    constructor(private toasterService: ToasterService) {
        this.toasterService.toasterSubject.subscribe((toasterObj: any) => {
            if (toasterObj && toasterObj.msg && toasterObj.msg.trim() !== '') {
                this.addToast(toasterObj);
            }
        });
    }

    addToast(toasterObj: any) {
        const toast = {
            type: toasterObj.type,
            msg: toasterObj.msg,
            icon: this.getIcon(toasterObj.type),
            timeoutId: null
        };

        // Add new toast to the top (or bottom depending on preference, unshift adds to top)
        this.toasts.unshift(toast);

        this.setToastTimeout(toast);
    }

    getIcon(type: string): string {
        switch (type) {
            case 'success':
                return 'bi-check-circle-fill';
            case 'error':
            case 'alarm':
                return 'bi-x-circle-fill';
            case 'warning':
                return 'bi-exclamation-triangle-fill';
            case 'info':
            default:
                return 'bi-info-circle-fill';
        }
    }

    setToastTimeout(toast: any) {
        if (toast.type === 'alarm') {
            const audio = new Audio('assets/push_notification.wav');
            audio.play().catch(e => console.log('Audio play error', e));
        }

        const duration = toast.type === 'alarm' ? 30000 : 5000;

        toast.timeoutId = setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    }

    removeToast(toast: any) {
        const index = this.toasts.indexOf(toast);
        if (index > -1) {
            if (toast.timeoutId) {
                clearTimeout(toast.timeoutId);
            }
            this.toasts.splice(index, 1);
        }
    }
}
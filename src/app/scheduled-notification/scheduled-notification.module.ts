import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduledNotificationRoutingModule } from './scheduled-notification-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';


@NgModule({
    declarations: [
        NotificationListComponent,
        CreateNotificationComponent
    ],
    imports: [
        CommonModule,
        ScheduledNotificationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        CreateNotificationComponent
    ]
})
export class ScheduledNotificationModule { }

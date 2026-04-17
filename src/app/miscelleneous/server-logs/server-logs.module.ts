import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServerLogsComponent } from './server-logs.component';
import { ServerLogsRoutingModule } from './server-logs-routing.module';
import { FormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';



@NgModule({
  declarations: [
    ServerLogsComponent
  ],
  imports: [
    CommonModule,
    ServerLogsRoutingModule,
    CustomPipeModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    ServerLogsComponent
  ]
})
export class ServerLogsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerLogsComponent } from './server-logs.component';

const routes: Routes = [
  {
    path:'', component:ServerLogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerLogsRoutingModule { }

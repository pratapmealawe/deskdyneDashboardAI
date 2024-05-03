import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigVariableComponent } from './config-variable.component';

const routes: Routes = [
  {
    path:'', component:ConfigVariableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigVariableRoutingModule { }

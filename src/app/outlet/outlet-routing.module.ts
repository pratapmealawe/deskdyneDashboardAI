import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from './outlet.component';

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
  },

  {
    path: 'master-categories',
    loadChildren: () =>
      import('./master-categories/master-categories.module').then(
        (m) => m.MasterCategoriesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletRoutingModule {}

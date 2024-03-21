import { NgModule } from '@angular/core';
import { ManualFilterPipe } from './filter.pipe';
import { ArraySortPipe } from './sort.pipe';

@NgModule({
  imports: [
  ],
  declarations: [ArraySortPipe,ManualFilterPipe],
  exports: [ArraySortPipe,ManualFilterPipe]
})
export class CustomPipeModule {}

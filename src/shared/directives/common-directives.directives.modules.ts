import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective, AlphaNumericDirective, OnlyAlphaDirective } from './common-directives.directive';
import { AutoTooltipDirective } from './auto-tooltip.directive';

@NgModule({
  declarations: [
    OnlyAlphaDirective,
    OnlyNumberDirective,
    AlphaNumericDirective,
    AutoTooltipDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnlyAlphaDirective,
    OnlyNumberDirective,
    AlphaNumericDirective,
    AutoTooltipDirective
  ]
})
export class DirectivesModule {}

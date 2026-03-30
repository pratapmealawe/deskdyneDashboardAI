import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective, AlphaNumericDirective, OnlyAlphaDirective } from './common-directives.directive';
import { AutoTooltipDirective } from './auto-tooltip.directive';
import { HasPermissionDirective } from './has-permission.directive';

@NgModule({
  declarations: [
    OnlyAlphaDirective,
    OnlyNumberDirective,
    AlphaNumericDirective,
    AutoTooltipDirective,
    HasPermissionDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnlyAlphaDirective,
    OnlyNumberDirective,
    AlphaNumericDirective,
    AutoTooltipDirective,
    HasPermissionDirective,
  ]
})
export class DirectivesModule {}

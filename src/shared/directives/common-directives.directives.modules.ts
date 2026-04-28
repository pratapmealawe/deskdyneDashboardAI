import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective, AlphaNumericDirective, OnlyAlphaDirective } from './common-directives.directive';
import { HasPermissionDirective } from './has-permission.directive';

@NgModule({
  declarations: [
    OnlyAlphaDirective,
    OnlyNumberDirective,
    AlphaNumericDirective,
    HasPermissionDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnlyAlphaDirective,
    OnlyNumberDirective,
    AlphaNumericDirective,
    HasPermissionDirective,
  ]
})
export class DirectivesModule {}

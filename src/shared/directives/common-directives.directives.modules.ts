import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective, AlphaNumericDirective, OnlyAlphaDirective } from './common-directives.directive';

@NgModule({
  declarations: [
    OnlyAlphaDirective,
    OnlyNumberDirective,
    AlphaNumericDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnlyAlphaDirective,
    OnlyNumberDirective,
    AlphaNumericDirective
  ]
})
export class DirectivesModule {}

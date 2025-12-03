import { Directive, HostListener } from '@angular/core';
import { ToasterService } from 'src/app/toaster/toaster.service';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  constructor(    private toasterService: ToasterService){

  }
  private regex = new RegExp(/^[0-9]*$/);

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const initialValue = event.target.value;
    event.target.value = initialValue.replace(/[^0-9]/g, '');
    if (initialValue !== event.target.value) {
      event.stopPropagation();
    }
  }
}

@Directive({
  selector: '[appOnlyAlpha]'
})
export class OnlyAlphaDirective {
 constructor(    private toasterService: ToasterService){

  }
  @HostListener('input', ['$event'])
  onInput(event: any) {
    console.log("vvyvuv");
    
    const initialValue = event.target.value;
    event.target.value = initialValue.replace(/[^a-zA-Z]/g, '');
    if (initialValue !== event.target.value) {
      event.stopPropagation();
         this.toasterService.error(122);
    }
  }
}

@Directive({
  selector: '[appAlphaNumeric]'
})
export class AlphaNumericDirective {
 constructor(    private toasterService: ToasterService){

  }
  @HostListener('input', ['$event'])
  onInput(event: any) {
    const initialValue = event.target.value;
    event.target.value = initialValue.replace(/[^a-zA-Z0-9]/g, '');
    if (initialValue !== event.target.value) {
      event.stopPropagation();
    }
  }
}

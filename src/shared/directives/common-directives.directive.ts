import { Directive, HostListener } from "@angular/core";
@Directive({
  selector: '[appOnlyAlpha]'
})
export class OnlyAlphaDirective {
  @HostListener('input', ['$event']) onInput(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
  }
}  

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  @HostListener('input', ['$event'])
  onInput(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }
}

@Directive({
  selector: '[appAlphaNumeric]'
})
export class AlphaNumericDirective {
  @HostListener('input', ['$event'])
  onInput(event: any) {
    event.target.value = event.target.value.replace(/[^A-Za-z0-9 ]/g, '');
  }
}

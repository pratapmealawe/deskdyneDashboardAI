import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
@Directive({
  selector: '[appOnlyAlpha]'
})
export class OnlyAlphaDirective {
   constructor(private control: NgControl) {}
  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/[^a-zA-Z ]/g, '');

    if (cleaned !== input.value) {
      input.value = cleaned;

      // 🔥 Update Angular form control manually
      this.control.control?.setValue(cleaned, {
        emitEvent: false,
      });
    }
  }
}
@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  constructor(private control: NgControl) {}
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

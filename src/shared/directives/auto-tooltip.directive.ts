import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: 'mat-icon',   // apply to ALL mat-icon elements
  providers: [MatTooltip]
})
export class AutoTooltipDirective implements AfterViewInit {

  constructor(private el: ElementRef, private tooltip: MatTooltip) {}

  ngAfterViewInit(): void {
    // allow opt-out
    if (this.el.nativeElement.hasAttribute('noAutoTooltip')) {
      return;
    }

    const iconText = this.el.nativeElement.innerText.trim().toLowerCase();

    const tooltipMap: any = {
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      visibility: 'View',
      remove: 'Remove',
      save: 'Save'
    };

    if (tooltipMap[iconText]) {
      this.tooltip.message = tooltipMap[iconText];
      this.tooltip.position = 'below';

      // show on hover
      this.el.nativeElement.addEventListener('mouseenter', () => {
        this.tooltip.show();
      });
      this.el.nativeElement.addEventListener('mouseleave', () => {
        this.tooltip.hide();
      });
    }
  }
}

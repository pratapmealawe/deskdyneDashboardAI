import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appAutoTooltip]',
  providers: [MatTooltip]
})
export class AutoTooltipDirective implements AfterViewInit {

  constructor(private el: ElementRef, private tooltip: MatTooltip) { }

  ngAfterViewInit(): void {
    const iconText = this.el.nativeElement.innerText.trim().toLowerCase();
    const tooltipMap: any = {
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      visibility: 'View',
      remove: 'Remove',
      save: 'Save'

    }
    if(tooltipMap[iconText]){
      this.tooltip.message = tooltipMap;[iconText];
      this.tooltip.position ='below';

    }
  }
}
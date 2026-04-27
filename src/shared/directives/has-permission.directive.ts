import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionsService } from '@service/permission.service';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective implements OnInit {
  private _permissionKey = '';
  private _hasView = false;

  @Input() set appHasPermission(key: string) {
    this._permissionKey = key;
    this._updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private permissionsService: PermissionsService
  ) { }

  ngOnInit(): void {
    this._updateView();
  }

  private _updateView(): void {
    const allowed = this.permissionsService.hasPermission(this._permissionKey);
    if (allowed && !this._hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this._hasView = true;
    } else if (!allowed && this._hasView) {
      this.viewContainerRef.clear();
      this._hasView = false;
    }
  }
}

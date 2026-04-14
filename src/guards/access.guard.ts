import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionsService } from 'src/service/permission.service';

export const accessGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate(route, state);
};

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const _auth: AuthService = inject(AuthService);
  if (_auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};

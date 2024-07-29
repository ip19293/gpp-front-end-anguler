import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  /*   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  } */
  canActivate(): boolean {
    if (this.authService.isLoggedInProf()) {
      return true; // User is logged in, allow access
    } else {
      this.router.navigate(['auth/login']); // Redirect to login if not logged in
      return false;
    }
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Promise<boolean> | Observable<boolean> {
    return this.authService.authUser.pipe(take(1), map(user => {
      const isAuthenticated = !!user;
      if (isAuthenticated) {
        return true;
      }
      else {
        this.router.navigate(['/login']);
      }
    }))
  }
}

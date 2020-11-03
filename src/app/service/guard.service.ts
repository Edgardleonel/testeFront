import { AuthFirebaseService } from './auth-firebase.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private auth: AuthFirebaseService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

  const auth = localStorage.getItem('user');
  if (auth) {
    return true;
  }
  this.router.navigateByUrl('/');
  return false;
  }

}

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthService).status().pipe(take(1),map((loggedIn:boolean)=>{
    if(loggedIn){
      return true;
    }else{
     return inject(Router).createUrlTree(['/config']);
    }
  }));
};

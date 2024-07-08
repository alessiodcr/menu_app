import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const superGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthService).class().pipe(take(1),map((accountClass:string)=>{
    if(accountClass == 'super'){
      return true
    }else{
     return inject(Router).createUrlTree(['/login']);
    }
  }));
};
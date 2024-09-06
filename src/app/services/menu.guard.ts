import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SwitchService } from './switch.service';
import { map, take } from 'rxjs';

export const menuGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(SwitchService).getStatus().pipe(take(1),map((res)=>{
    if(res){
     return true;
    }else{
     router.navigate(['/menu-non-disponibile'])
     return false
    }
  }));
};

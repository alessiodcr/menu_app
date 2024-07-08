import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { account } from '../../../types';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  menuClick(){
    this.authService.logout()
    this.router.navigate(['/menu/allergeni'])
  }

  sideDisplay = {
    value: 'display: none;',
    toggle(){
      if(this.value == 'display: none;'){
        this.value = ''
      }else{
        this.value = 'display: none;'
      }
    }
  }

  account:any = JSON.parse(localStorage.getItem('user') as string)
}

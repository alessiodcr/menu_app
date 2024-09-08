import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { account } from '../../../types';
import { PagesService } from '../../services/pages.service';
import { ENV } from '../../../env/variables';
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
    private router: Router,
    private pageService: PagesService
  ){}
  menuClick(){
    this.authService.logout()
    this.router.navigate([`/menu/${this.pages[0]}`])
  }
  pages: string[] = []
  ngOnInit(){
    this.pageService.getPages().subscribe(res=>{
      this.pages = res.pages
    })
  }

  env = ENV

  account:any = JSON.parse(localStorage.getItem('user') as string)
}

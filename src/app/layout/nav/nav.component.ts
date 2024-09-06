import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { pageRoute } from '../../../assets/utils';
import { privateDecrypt } from 'node:crypto';
import { CopertoService } from '../../services/coperto.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(
    private pageService: PagesService,
    private router: Router,
    private copertoService:CopertoService,
    private authService: AuthService
  ){
    
  }


  isLoggedIn: boolean = false
  coperto:string = '0'
  pages: string[] = [];
  ngOnInit(){
    this.pageService.getPages().subscribe(data =>{
      this.pages = data.pages
    })
    this.copertoService.getCoperto().subscribe(data=>{
      this.coperto  = data.coperto
    })
    this.authService.status().subscribe(res=>{
      this.isLoggedIn = res
    })
  }
  pageRoute = pageRoute
  currentPage(){
    const url = this.router.url.slice(6)
    return this.pages.indexOf(url) + 1
  }
  nextPage(){
    const url = this.router.url.slice(6)
    if(this.pages.indexOf(url) === this.pages.length - 1){
      return NaN
    }else{
      return this.pages.indexOf(url) + 2
    }
  }
  prevPage(){
    const url = this.router.url.slice(6)
    if(this.pages.indexOf(url) == 0){
      return NaN
    }else{
      return this.pages.indexOf(url)
    }
  }


}

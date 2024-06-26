import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { pageRoute } from '../../../assets/utils';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(
    private pageService: PagesService,
    private router: Router
  ){}
  pages: string[] = [];
  ngOnInit(){
    this.pageService.getPages(`http://localhost:3000/pages`).subscribe(data =>{
      this.pages = data.pages
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

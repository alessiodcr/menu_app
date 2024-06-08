import { Component } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { RouterLink } from '@angular/router';
import { pageRoute } from '../../../assets/utils';
@Component({
  selector: 'app-config-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './config-nav.component.html',
  styleUrl: './config-nav.component.css'
})
export class ConfigNavComponent {
  constructor(
    private pageService: PagesService
  ){

  }
  pageRoute = pageRoute
  pages: string[] = []
  ngOnInit(){
    this.pageService.getPages("http://localhost:3000/pages").subscribe(data =>{
      this.pages = data.pages
    })
  }
}

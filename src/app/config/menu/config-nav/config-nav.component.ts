import { Component } from '@angular/core';
import { PagesService } from '../../../services/pages.service';
import { Router, RouterLink } from '@angular/router';
import { pageRoute } from '../../../../assets/utils';
import { AuthService } from '../../../services/auth.service';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-config-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './config-nav.component.html',
  styleUrl: './config-nav.component.css'
})
export class ConfigNavComponent {
  constructor(
    private pageService: PagesService,
  ){}
  
  pageRoute = pageRoute
  pages: string[] = []
  ngOnInit(){
    this.pageService.getPages().subscribe(data =>{
      this.pages = data.pages
    })
  }

  
}

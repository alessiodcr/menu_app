import { Component } from '@angular/core';
import { PagesService } from '../services/pages.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navigate',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.css'
})
export class NavigateComponent {
  constructor(
    private pageService: PagesService
  ){

  }
  pages: string[] = []
  ngOnInit(){
    this.pageService.getPages('http://localhost:3000/pages').subscribe(res=>{
      this.pages = res.pages
    })
  }
}

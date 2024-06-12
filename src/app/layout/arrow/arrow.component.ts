import { Component } from '@angular/core';
import { State } from '../../../types';
import { Router, RouterLink } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  
  selector: 'app-arrow',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './arrow.component.html',
  styleUrl: './arrow.component.css'
})
export class ArrowComponent {
constructor(
  private route: Router,
  private pageService: PagesService
){}
  pages: string[] = []
  ngOnInit(){
    this.pageService.getPages(`http://localhost:3000/pages`).subscribe(data =>{
      this.pages = data.pages
    })
  }
  nextPage(){
    //dichiaro id uguale all url attuale senza lo slash
    const id = this.route.url.slice(6);
    if(this.pages.indexOf(id) < 7){
      return this.pages[this.pages.indexOf(id) +1]  
    }else{
      return  `/allergeni`;
    }  
  }
  prevPage(): string{
    //dichiaro id uguale all url attuale senza lo slash
    const id = this.route.url.slice(6);
    if(this.pages.indexOf(id) > 0){
      return this.pages[this.pages.indexOf(id) -1]
  }else{
    return  `/allergeni`;
  }
  }
  
}
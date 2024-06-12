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
  display = {
    value: '',
    formValue: 'display: none',
    toggle(){
      if(this.value == ''){
        this.value = 'display: none'
        this.formValue = ''
      }else{
        this.value = ''
        this.formValue = 'display: none'
      }
    }
  }
  pageRoute = pageRoute
  pages: string[] = []
  ngOnInit(){
    this.pageService.getPages("http://localhost:3000/pages").subscribe(data =>{
      this.pages = data.pages
    })
  }

  postPage(){
    const element =document.querySelector('#newPageInput') as  any
    let value = element.value as string
    this.pageService.postPage('http://localhost:3000/pages', value).subscribe(data =>{
      console.log(data)
      console.log('creato')
    })
    element.value = null
    this.display.toggle()
  };
  deletePage(page: string){
    this.pageService.deletePage('http://localhost:3000/pages', page).subscribe(data =>{
      console.log(data)
      console.log('cancellato')
    })
  }
}

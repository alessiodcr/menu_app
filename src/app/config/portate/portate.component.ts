import { Component } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-portate',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './portate.component.html',
  styleUrl: './portate.component.css'
})
export class PortateComponent {
  constructor(
    private pagesService: PagesService
  ){}
  newPage = new FormGroup({
    newPage: new FormControl('')
  })
  handlePost(){
    const page = this.newPage.value.newPage
    if(page){
      this.pagesService.postPage(page).subscribe(res=>{
        console.log(res)
        this.ngOnInit()
      })
    }
    this.display.toggle()
  }
  deleteRoute(page:string){
    this.pagesService.deletePage(page).subscribe(res=>{
      console.log(res)
      this.ngOnInit()
    })
  }
  pages: string[] = []
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
  ngOnInit(){
    this.pagesService.getPages().subscribe(res=>{
      this.pages = res.pages
      this.displayDeletePortata.setFalse()
    })
  }

  displayDeletePortata: {
    value: string,
    portata: string,
    setTrue: (portata: string) =>void,
    setFalse: () =>void
  } = {
    value: 'display: none;',
    portata: '',
    setTrue(portata: string){
      this.value = 'display:flex;';
      this.portata = portata
    },
    setFalse(){
      this.value = 'display: none;';
      this.portata = ''
    }
  }
}

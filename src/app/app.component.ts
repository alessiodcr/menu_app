import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { GridComponent } from './layout/grid/grid.component';
import { AllergeniComponent } from './layout/allergeni/allergeni.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { OptionsService } from './services/options.service';
import { PagesService } from './services/pages.service';
import { SwitchService } from './services/switch.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule,GridComponent, AllergeniComponent,
    RouterLink, RouterLinkActive, SignInComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title =  "menu_app";
  constructor(
    private optionsService: OptionsService,
    private pageService: PagesService,
    private switchService: SwitchService
  ){}
  ngOnInit(){
    this.switchService.getStatusFromServer()
    this.pageService.getPages().subscribe(res=>{
      document.documentElement.style.setProperty('--pages', String(res.pages.length + 1))
    })
    this.optionsService.getOptions().subscribe(res =>{
      document.documentElement.style.setProperty('--primario', res.primario)
      document.documentElement.style.setProperty('--secondario', res.secondario)
      document.documentElement.style.setProperty('--terziario', res.terziario)
      document.documentElement.style.setProperty('--piccoli', res.piccoli + 'px')
      document.documentElement.style.setProperty('--grandi', res.grandi+ 'px')
      document.documentElement.style.setProperty('--grandi2', res.grandi2 + 'px')
      document.documentElement.style.setProperty('--font1', res.font1 )
      document.documentElement.style.setProperty('--font2', res.font2)
      document.documentElement.style.setProperty('--font3', res.font3)
      if(res.immagine){
        document.documentElement.style.setProperty('--immagine', 'inline-flex')
      }else{
        document.documentElement.style.setProperty('--immagine', 'none')
      }
      if(res.coperto){
        document.documentElement.style.setProperty('--coperto', 'block')
      }else{
        document.documentElement.style.setProperty('--coperto', 'none')
      }
      
    })

    
  }
}

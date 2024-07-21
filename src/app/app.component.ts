import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './layout/arrow/arrow.component';
import { GridComponent } from './layout/grid/grid.component';
import { AllergeniComponent } from './layout/allergeni/allergeni.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { OptionsService } from './services/options.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule,
    ArrowComponent,GridComponent, AllergeniComponent,
    RouterLink, RouterLinkActive, SignInComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title =  "menu_app";
  constructor(
    private optionsService: OptionsService
  ){}
  ngOnInit(){
    this.optionsService.getOptions().subscribe(res =>{
      document.documentElement.style.setProperty('--primario', res.primario)
      document.documentElement.style.setProperty('--secondario', res.secondario)
      document.documentElement.style.setProperty('--terziario', res.terziario)
      document.documentElement.style.setProperty('--piccoli', res.piccoli + 'px')
      document.documentElement.style.setProperty('--grandi', res.grandi+ 'px')
      document.documentElement.style.setProperty('--grandi2', res.grandi2 + 'px')
      console.log()
      //document.documentElement.style.setProperty('--font1', res.font1 )
      //document.documentElement.style.setProperty('--font2', res.font2)
      if(res.immagine){
        document.documentElement.style.setProperty('--immagine', 'inline-flex')
      }else{
        document.documentElement.style.setProperty('--immagine', 'none')
      }
      
    })

    
  }
}

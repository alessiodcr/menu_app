import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './layout/arrow/arrow.component';
import { GridComponent } from './layout/grid/grid.component';
import { FilterComponent } from './layout/filter/filter.component';
import { CartComponent } from './layout/cart/cart.component';
import { AllergeniComponent } from './layout/allergeni/allergeni.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavComponent, CommonModule,
    ArrowComponent,GridComponent, FilterComponent, CartComponent, AllergeniComponent,
    RouterLink, RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title =  "menu_app";
  
  
}

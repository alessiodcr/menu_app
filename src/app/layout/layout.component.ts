import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './arrow/arrow.component';
import { GridComponent } from './grid/grid.component';
import { FilterComponent } from './filter/filter.component';
import { CartComponent } from './cart/cart.component';
import { AllergeniComponent } from './allergeni/allergeni.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavComponent, CommonModule,
    ArrowComponent,GridComponent, FilterComponent, CartComponent, AllergeniComponent,
    RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}

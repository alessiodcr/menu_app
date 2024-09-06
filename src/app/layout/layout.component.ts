import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { AllergeniComponent } from './allergeni/allergeni.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule,GridComponent, AllergeniComponent,
    RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}

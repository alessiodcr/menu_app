import { Component } from '@angular/core';
import { ENV } from '../../env/variables';

@Component({
  selector: 'app-menu-non-disponibile',
  standalone: true,
  imports: [],
  templateUrl: './menu-non-disponibile.component.html',
  styleUrl: './menu-non-disponibile.component.css'
})
export class MenuNonDisponibileComponent {
  ENV = ENV
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigNavComponent } from '../config-nav/config-nav.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, ConfigNavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}

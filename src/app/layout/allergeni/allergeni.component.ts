import { Component } from '@angular/core';
import { ENV } from '../../../env/variables';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-allergeni',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './allergeni.component.html',
  styleUrl: './allergeni.component.css'
})
export class AllergeniComponent {
  env = ENV
  allergeni: string[] = ['cereali', 'crostacei', "uova","pesce", "arachidi","soia","latte","fruttaAGuscio","sedano","senape","sesamo","Asolforica","lupini","molluschi", "funghi"]
}

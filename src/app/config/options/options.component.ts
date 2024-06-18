import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OptionsService } from '../../services/options.service';
import { options } from '../../../types';
@Component({
  selector: 'app-options',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  constructor (private optionsService: OptionsService){}
  ngOnInit(){
    this.optionsService.getOptions().subscribe(res =>{
      this.optionsForm.controls.primario.setValue(res.primario)
      this.optionsForm.controls.secondario.setValue(res.secondario)
      this.optionsForm.controls.terziario.setValue(res.terziario)
      this.optionsForm.controls.immagine.setValue(res.immagine)
      this.optionsForm.controls.grandi.setValue(res.grandi)
      this.optionsForm.controls.piccoli.setValue(res.piccoli)
    })
  }
  optionsForm = new FormGroup({
    primario: new FormControl(),
    secondario: new FormControl(),
    terziario: new FormControl(),
    immagine: new FormControl(),
    grandi: new FormControl(),
    piccoli: new FormControl()
  })

  fontPiccoli(){
    return `font-size: ${this.optionsForm.value.piccoli}px`
  }
  fontGrandi(){
    return `font-size: ${this.optionsForm.value.grandi}px`
  }

  handleSubscribe(){
    const options: options = {
      primario: this.optionsForm.value.primario,
      secondario: this.optionsForm.value.secondario,
      terziario: this.optionsForm.value.terziario,
      immagine: this.optionsForm.value.immagine,
      piccoli: this.optionsForm.value.piccoli,
      grandi: this.optionsForm.value.grandi
    }
    this.optionsService.postOptions(options).subscribe(res =>{
      console.log('fatto' +res)
    })
  }
}

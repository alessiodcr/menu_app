import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OptionsService } from '../../services/options.service';
import { options } from '../../../types';
import { ImgUploadService } from '../../services/img-upload.service';
import { allergeneImg } from '../../../assets/utils';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-options',
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  constructor (private optionsService: OptionsService,
    private publicUpload: ImgUploadService
  ){}


  ngOnInit(){
    this.optionsService.getOptions().subscribe(res =>{
      this.optionsForm.controls.primario.setValue(res.primario)
      this.optionsForm.controls.secondario.setValue(res.secondario)
      this.optionsForm.controls.terziario.setValue(res.terziario)
      this.optionsForm.controls.immagine.setValue(res.immagine)
      this.optionsForm.controls.coperto.setValue(res.coperto)
      this.optionsForm.controls.grandi.setValue(res.grandi)
      this.optionsForm.controls.grandi2.setValue(res.grandi2)
      this.optionsForm.controls.piccoli.setValue(res.piccoli)
      this.optionsForm.controls.font1.setValue(res.font1)
      this.optionsForm.controls.font2.setValue(res.font2)
      this.optionsForm.controls.font3.setValue(res.font3)
    })
  }

  fonts: string[] = ['Barlow','DM Sans', 'Fira Sans', 'IBM Plex Sans', 'Inconsolata', 'Inter', 'Kanit', 'Lora','Manrope', 'Merriweather', 'Montserrat', 'Mulish', 'Noto Sans','Nunito Sans', 'Nunito','Open Sans','Oswald','PT Sans', 'Playfair Display', 'Poppins', 'Quicksand', 'Raleway','Roboto Condensed','Roboto Mono', 'Roboto Slab', 'Roboto', 'Rubik','Titillium Web','Ubuntu','Work Sans']


  optionsForm = new FormGroup({
    primario: new FormControl(),
    secondario: new FormControl(),
    terziario: new FormControl(),
    immagine: new FormControl(),
    coperto: new FormControl(),
    grandi2: new FormControl(),
    grandi: new FormControl(),
    piccoli: new FormControl(),
    font1: new FormControl(),
    font2: new FormControl(),
    font3: new FormControl()
  })


  imgForm = new FormGroup({
    cereali: new FormControl(),
    crostacei: new FormControl(),
    uova: new FormControl(),
    pesce: new FormControl(),
    arachidi: new FormControl(),
    soia: new FormControl(),
    latte: new FormControl(),
    fruttaAGuscio: new FormControl(),
    sedano: new FormControl(),
    senape: new FormControl(),
    sesamo: new FormControl(),
    Asolforica: new FormControl(),
    lupini: new FormControl(),
    molluschi: new FormControl(),
    funghi: new FormControl(),
    optionsLogo: new FormControl()
  })

  allergeni: string[] = ['cereali', 'crostacei', "uova","pesce", "arachidi","soia","latte","fruttaAGuscio","sedano","senape","sesamo","Asolforica","lupini","molluschi", "funghi"]

  text3(){
    return `font-size: ${this.optionsForm.value.piccoli}px;  font-family: ${this.optionsForm.value.font3}`
  }
  text2(){
    return `font-size: ${this.optionsForm.value.grandi}px;  font-family: ${this.optionsForm.value.font2}`
  }
  text1(){
    return `font-size: ${this.optionsForm.value.grandi2}px;  font-family: ${this.optionsForm.value.font1}`
  }
  

  allergeneImg = allergeneImg

  onImagePicked(event:any){
    const filename:string = event.target.id 
    const file = event.target.files[0]
    this.imgForm.get(`${filename}`)?.setValue(file)
    if(file){
      this.publicUpload.uploadImg(file, filename)?.subscribe(res=>{},err=>{console.log(err)})
    }
    
  }


  

  handleSubmit(){
    const options: options = {
      primario: this.optionsForm.value.primario,
      secondario: this.optionsForm.value.secondario,
      terziario: this.optionsForm.value.terziario,
      immagine: this.optionsForm.value.immagine,
      coperto: this.optionsForm.value.coperto,
      piccoli: this.optionsForm.value.piccoli,
      grandi: this.optionsForm.value.grandi,
      grandi2: this.optionsForm.value.grandi2,
      font1: this.optionsForm.value.font1,
      font2: this.optionsForm.value.font2,
      font3: this.optionsForm.value.font3
    }
    this.optionsService.postOptions(options).subscribe(res =>{
      console.log('fatto' +res)
      this.ngOnInit()
      this.displayConfirm.toggle()
    })
  }

  displayConfirm = {
    value: 'display: none;',
    toggle(){
      if(this.value === 'display: none;'){
        this.value  ='display: flex;';
      }else{
        this.value = 'display: none;'
      }
    }
  }
}

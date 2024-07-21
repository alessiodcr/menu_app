import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OptionsService } from '../../services/options.service';
import { options } from '../../../types';
import { ImgUploadService } from '../../services/img-upload.service';
@Component({
  selector: 'app-options',
  standalone: true,
  imports: [ReactiveFormsModule],
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
      this.optionsForm.controls.grandi.setValue(res.grandi)
      this.optionsForm.controls.grandi2.setValue(res.grandi2)
      this.optionsForm.controls.piccoli.setValue(res.piccoli)
      this.optionsForm.controls.font1.setValue(res.font1)
      this.optionsForm.controls.font2.setValue(res.font2)
    })
  }
  optionsForm = new FormGroup({
    primario: new FormControl(),
    secondario: new FormControl(),
    terziario: new FormControl(),
    immagine: new FormControl(),
    grandi2: new FormControl(),
    grandi: new FormControl(),
    piccoli: new FormControl(),
    font1: new FormControl(),
    font2: new FormControl()
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

  fontPiccoli(){
    return `font-size: ${this.optionsForm.value.piccoli}px`
  }
  fontGrandi(){
    return `font-size: ${this.optionsForm.value.grandi}px`
  }
  fontGrandi2(){
    return `font-size: ${this.optionsForm.value.grandi2}px`
  }
  font1(){
    return `font-family: ${this.optionsForm.value.font1}`
  }
  font2(){
    return `font-family: ${this.optionsForm.value.font2}`
  }

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
      piccoli: this.optionsForm.value.piccoli,
      grandi: this.optionsForm.value.grandi,
      grandi2: this.optionsForm.value.grandi2,
      font1: this.optionsForm.value.font1,
      font2: this.optionsForm.value.font2
    }
    this.optionsService.postOptions(options).subscribe(res =>{
      console.log('fatto' +res)
    })
  }
}

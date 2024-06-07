import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  //nel constructor dichiaro il service che mi serve per ricevere e inviare l'array di filtri
  constructor(private data: DataService) {}
   //dichiaro l'oggetto 'display' al cui interno ce value ovvero il valore di display e il metodo toggle() che ha il compito di dare a value un valore di display: block in caso il valore sia display: none, e di dare display: none in caso sia impostato su display: block
  //in questo modo posso fare in modo che il carrello appaia e scompaia
  display = {
    value: 'display: none',
    toggle(){
      if(this.value === 'display: none'){
        this.value = 'display: block';
      }else if(this.value === 'display: block'){
        this.value = 'display: none';
      }
    }
   }
   //dichiaro l'array contenente tutti gli allergeni
   allergeni: string[] = ['cereali', 'crostacei', "uova","pesce", "arachidi","soia","latte","fruttaAGuscio","sedano","senape","sesamo","Asolforica","lupini","molluschi", "funghi"]
   //dichiaro l'array contenente i filtri selezionati
   filtri: string[] = [];
   //dichiaro la funzione che si occuperà di gestire il form quando cambia e faccio in modo che come argomenti accetti l'evento
   handleChange(event: Event){
    //dichiaro element uguale al target dell'evento in modo tale da avere l'elemento sulla quale è avvenuto il cambiamento
    const element = event.target as HTMLFormElement;
    //ottengo il valore del checkbox
    const value:string  = element.getAttribute('value') as string;
    //se il filtro è gia stato selezionato lo rimuovo e dopo invio al service l'array aggiornato
    if(this.filtri.includes(value)){
      const index = this.filtri.indexOf(value);
      this.filtri.splice(index, 1)
      this.data.sendData(this.filtri)

    }else{
      //se il filtro non è compreso lo aggiungo all'array e invio l'array aggiornato
      this.filtri.push(value);
      this.data.sendData(this.filtri)
    }
   }
   /*RemoveFilters(){
    this.filtri = [];
    this.data.sendData(this.filtri)
   }*/
  }










   


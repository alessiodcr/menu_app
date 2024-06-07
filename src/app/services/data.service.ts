import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new Subject<string[]>();
  sendData(filters: string[]){
    this.subject.next(filters);
  }

  clearData(){
    this.subject.next([]);
  }

  getData(): Observable<string[]>{
    return this.subject.asObservable();
  }




}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buffer } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImg(img: File, name:string){
    let filename = name + img.name.slice(img.name.indexOf('.'))
    console.log(filename)
    let formData = new FormData()
    formData.append('img', img, filename)
    return this.http.post('http://localhost:3000/publicImgUpload', formData)
  }
}

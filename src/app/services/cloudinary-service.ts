import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  apiUrl = 'https://api.cloudinary.com/v1_1/dnpyshj4b/image/upload';
  pasta = 'cnb';
  constructor(private http: HttpClient) {}

  postCapaGrupo(foto: FormData) {
    return this.http.post(`${this.apiUrl}`, foto);
  }
}

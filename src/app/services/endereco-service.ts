import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco/Endereco';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  endPoint = '/endereco';
  constructor(private http: HttpClient) {}

  buscarCep(cep: string) {
    return this.http.get<Endereco>(
      `${environment.apiUrl}${this.endPoint}/${cep}`,
      {
        withCredentials: true,
      },
    );
  }
}

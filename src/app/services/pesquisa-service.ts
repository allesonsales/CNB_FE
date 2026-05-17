import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioLista } from '../models/usuario/usuario-lista';

@Injectable({
  providedIn: 'root',
})
export class PesquisaService {
  endPoint = '/search';
  constructor(private http: HttpClient) {}

  buscarUsuario(nome: string) {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<UsuarioLista[]>(
      `${environment.apiUrl}${this.endPoint}`,
      {
        params,
        withCredentials: true,
      },
    );
  }
}

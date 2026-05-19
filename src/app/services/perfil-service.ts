import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../models/perfil/perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  endPoint = '/perfil';
  constructor(private http: HttpClient) {}

  preencherPerfil(usuarioId: number) {
    return this.http.get<Perfil>(
      `${environment.apiUrl}${this.endPoint}/${usuarioId}`,
      { withCredentials: true },
    );
  }
}

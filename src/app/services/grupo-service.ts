import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../models/grupo/grupo';
import { FlashMessage } from '../models/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  endpoint = '/grupos';

  constructor(private http: HttpClient) {}

  criarGrupo(grupo: Grupo) {
    return this.http.post<FlashMessage>(
      `${environment.apiUrl}${this.endpoint}`,
      grupo,
      { withCredentials: true },
    );
  }
}

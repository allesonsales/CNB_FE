import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashMessage } from '../models/Response';
import { environment } from 'src/environments/environment';
import { AmizadeStatusRes } from '../models/amizade/amizade-status';
import { Amizade } from '../models/amizade/amizade';
import { AmizadeAcao } from '../models/amizade/amizade-acao';

@Injectable({
  providedIn: 'root',
})
export class AmizadeService {
  endPoint = '/amizades';
  constructor(private http: HttpClient) {}

  adicionarAmigo(id: number) {
    return this.http.post<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}`,
      id,
      {
        withCredentials: true,
      },
    );
  }

  verificarAmizade(amigoId: number) {
    return this.http.get<Amizade>(
      `${environment.apiUrl}${this.endPoint}/${amigoId}/status`,
      { withCredentials: true },
    );
  }

  atualizarAmizade(amizadeId: number, status: AmizadeStatusRes | AmizadeAcao) {
    return this.http.patch<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/${amizadeId}`,
      { status },
      { withCredentials: true },
    );
  }
}

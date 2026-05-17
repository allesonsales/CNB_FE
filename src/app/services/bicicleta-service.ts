import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bicicleta, BicicletaLista } from '../models/bicicleta/Bicicleta';
import { FormGroup } from '@angular/forms';
import { Transacao } from '../models/transacao/transacao';
import { FlashMessage } from '../models/Response';

@Injectable({
  providedIn: 'root',
})
export class BicicletaService {
  endPoint = '/bicicleta';

  bicicletas = signal<BicicletaLista[]>([]);

  constructor(private http: HttpClient) {}

  adicionarBicicleta(formBicicleta: FormGroup) {
    return this.http.post<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}`,
      formBicicleta,
      { withCredentials: true },
    );
  }

  buscarBicicletas() {
    return this.http.get<BicicletaLista[]>(
      `${environment.apiUrl}${this.endPoint}`,
      {
        withCredentials: true,
      },
    );
  }

  buscarBicicletaId(id: number) {
    return this.http.get<Bicicleta>(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      { withCredentials: true },
    );
  }

  buscarBicicletaNumeroSerie(numeroSerie: string) {
    return this.http.get<Bicicleta>(
      `${environment.apiUrl}${this.endPoint}/numeroserie/${numeroSerie}`,
      { withCredentials: true },
    );
  }

  buscarTransacoes(id: number) {
    return this.http.get<Transacao[]>(
      `${environment.apiUrl}${this.endPoint}/${id}/transacoes`,
      { withCredentials: true },
    );
  }

  editarBicicleta(id: number, bicicletaAtualizada: BicicletaLista) {
    return this.http.patch<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      bicicletaAtualizada,
      { withCredentials: true },
    );
  }

  autenticarBicicleta(numeroSerie: string) {
    return this.http.get<any>(
      `${environment.apiUrl}${this.endPoint}/autenticar/${numeroSerie}`,
      { withCredentials: true },
    );
  }

  excluirBicicleta(id: number) {
    return this.http.delete<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      {
        withCredentials: true,
      },
    );
  }
}

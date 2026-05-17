import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transacao } from '../models/transacao/transacao';
import { FlashMessage } from '../models/Response';
import { TransacaoRequest } from '../models/transacao/transacao-request';
import { TransacaoAcao } from '../models/transacao/transacao-acao';

@Injectable({
  providedIn: 'root',
})
export class TransacaoService {
  endPoint = '/transacoes';
  constructor(private http: HttpClient) {}

  criarTransacao(transacao: TransacaoRequest) {
    return this.http.post<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}`,
      transacao,
      { withCredentials: true },
    );
  }

  buscarTransacoesBicicletaId(id: number) {
    return this.http.get<Transacao[]>(
      `${environment.apiUrl}${this.endPoint}/${id}`,
      { withCredentials: true },
    );
  }

  atualizarTransacao(bicicletaId: number, acao: TransacaoAcao) {
    return this.http.patch<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/${bicicletaId}`,
      { acao },
      { withCredentials: true },
    );
  }
}

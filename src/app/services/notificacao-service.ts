import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notificacao } from '../models/notificacoes/Notificacao';
import { BehaviorSubject, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  endPoint = '/notificacoes';

  notificacoes = signal<Notificacao[]>([]);

  constructor(private http: HttpClient) {}

  startPolling() {
    return timer(0, 30000).pipe(switchMap(() => this.buscarNotificacoes()));
  }

  buscarNotificacoes() {
    return this.http.get<Notificacao[]>(
      `${environment.apiUrl}${this.endPoint}/me`,
      { withCredentials: true },
    );
  }

  marcarComoLida(id: number) {
    return this.http.patch<void>(
      `${environment.apiUrl}${this.endPoint}/${id}/lida`,
      {},
      {
        withCredentials: true,
      },
    );
  }
}

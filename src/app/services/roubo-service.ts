import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouboRequest } from '../models/roubo/roubo-request';
import { environment } from 'src/environments/environment';
import { FlashMessage } from '../models/Response';

@Injectable({
  providedIn: 'root',
})
export class RouboService {
  endPoint = '/roubos';

  constructor(private httpClient: HttpClient) {}

  cadastrarRoubo(roubo: RouboRequest) {
    return this.httpClient.post<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}`,
      roubo,
      { withCredentials: true },
    );
  }

  marcarComoRecuperada(bicicletaId: number) {
    return this.httpClient.patch<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/${bicicletaId}`,
      {},
      { withCredentials: true },
    );
  }
}

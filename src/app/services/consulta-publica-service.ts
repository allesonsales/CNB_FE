import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BicicletaConsultaPublica } from '../models/bicicleta/bicicleta-consulta-publica';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultaPublicaService {
  endPoint = '/consulta';
  constructor(private httpClient: HttpClient) {}

  consultarNumeroSerie(numeroSerie: string) {
    return this.httpClient.get<BicicletaConsultaPublica>(
      `${environment.apiUrl}${this.endPoint}/numero-serie/${numeroSerie}`,
      {},
    );
  }
}

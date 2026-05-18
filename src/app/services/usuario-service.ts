import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FlashMessage } from '../models/Response';
import { Usuario, UsuarioCadastrar } from '../models/Usuario';
import { UsuarioResumido } from '../models/usuario/usuario-resumido';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  endPoit: string = '/usuarios';

  constructor(private http: HttpClient) {}

  cadastrar(usuarioCadastro: UsuarioCadastrar) {
    return this.http.post<FlashMessage>(
      `${environment.apiUrl}${this.endPoit}`,
      usuarioCadastro,
    );
  }

  buscarPorCpf(cpf: string) {
    return this.http.get<UsuarioResumido>(
      `${environment.apiUrl}${this.endPoit}/cpf/${cpf}`,
      { withCredentials: true },
    );
  }

  buscarPorId(id: number) {
    return this.http.get<UsuarioResumido>(
      `${environment.apiUrl}${this.endPoit}/id/${id}`,
      { withCredentials: true },
    );
  }
}

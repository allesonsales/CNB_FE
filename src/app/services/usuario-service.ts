import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FlashMessage } from '../models/Response';
import { Usuario, UsuarioCadastrar } from '../models/Usuario';
import { UsuarioResumido } from '../models/usuario/usuario-resumido';
import { UsuarioEdicao } from '../models/usuario/usuario-edicao';
import { AlterarSenha } from '../models/usuario/alterar-senha';
import { Amizade } from '../models/amizade/amizade';
import { AmizadeResponse } from '../models/amizade/amizade-res';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  endPoint: string = '/usuarios';

  constructor(private http: HttpClient) {}

  alterarSenha(dto: AlterarSenha) {
    return this.http.patch<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/me/senha`,
      dto,
      { withCredentials: true },
    );
  }

  cadastrar(usuarioCadastro: UsuarioCadastrar) {
    return this.http.post<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}`,
      usuarioCadastro,
    );
  }

  buscarPorCpf(cpf: string) {
    return this.http.get<UsuarioResumido>(
      `${environment.apiUrl}${this.endPoint}/cpf/${cpf}`,
      { withCredentials: true },
    );
  }

  buscarPorId(id: number) {
    return this.http.get<UsuarioResumido>(
      `${environment.apiUrl}${this.endPoint}/id/${id}`,
      { withCredentials: true },
    );
  }

  buscarParaEdicao() {
    return this.http.get<UsuarioEdicao>(
      `${environment.apiUrl}${this.endPoint}/me/editar`,
      { withCredentials: true },
    );
  }

  confirmarEdicao(usuarioAtualizado: UsuarioEdicao) {
    return this.http.patch<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/me/editar`,
      usuarioAtualizado,
      { withCredentials: true },
    );
  }

  getAmizades(usuarioId: number) {
    return this.http.get<AmizadeResponse[]>(
      `${environment.apiUrl}${this.endPoint}/${usuarioId}/amizades`,
      { withCredentials: true },
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormLogin } from '../features/auth/models/FormLogin';
import { FlashMessage } from '../models/Response';
import { UsuarioCadastrar } from '../models/Usuario';
import { UsuarioLogado } from '../models/usuario/usuario-logado';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint = '/auth';
  isLogged: boolean = false;

  usuarioLogado = signal<UsuarioLogado | null>(null);

  constructor(private http: HttpClient) {}

  login(login: FormLogin) {
    return this.http
      .post<FlashMessage>(`${environment.apiUrl}${this.endPoint}`, login, {
        withCredentials: true,
      })
      .pipe(
        tap((res: any) => {
          console.log('logadin', res);
          this.usuarioLogado.set(res.usuario);
        }),
      );
  }

  logout() {
    return this.http.post<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/logout`,
      {},
      { withCredentials: true },
    );
  }

  cadastrar(usuarioCadastro: UsuarioCadastrar) {
    return this.http.post<FlashMessage>(
      `${environment.apiUrl}${this.endPoint}/cadastrar`,
      usuarioCadastro,
    );
  }

  getUsuario() {
    return this.http.get<UsuarioLogado>(
      `${environment.apiUrl}${this.endPoint}/me`,
      {
        withCredentials: true,
      },
    );
  }
}

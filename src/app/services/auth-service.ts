import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormLogin } from '../features/auth/models/FormLogin';
import { FlashMessage } from '../models/Response';
import { UsuarioCadastrar } from '../models/Usuario';
import { UsuarioLogado } from '../models/usuario/usuario-logado';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint = '/auth';
  authReady = signal(false);

  usuarioLogado = signal<UsuarioLogado | null>(null);

  constructor(private http: HttpClient) {}

  restaurarSessao() {
    return this.http
      .get<UsuarioLogado>(`${environment.apiUrl}${this.endPoint}/me`, {
        withCredentials: true,
      })
      .pipe(
        tap((usuario) => {
          this.usuarioLogado.set(usuario);
          this.authReady.set(true);
        }),
        catchError(() => {
          this.usuarioLogado.set(null);
          this.authReady.set(true);

          return of(null);
        }),
      );
  }

  login(login: FormLogin) {
    return this.http
      .post<FlashMessage>(`${environment.apiUrl}${this.endPoint}`, login, {
        withCredentials: true,
      })
      .pipe(
        tap((res: any) => {
          this.usuarioLogado.set(res.usuario);
          this.authReady.set(true);
        }),
      );
  }

  logout() {
    return this.http
      .post<FlashMessage>(
        `${environment.apiUrl}${this.endPoint}/logout`,
        {},
        { withCredentials: true },
      )
      .pipe(
        tap(() => {
          this.usuarioLogado.set(null);
          this.authReady.set(false);
        }),
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

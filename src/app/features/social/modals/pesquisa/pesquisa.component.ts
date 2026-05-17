import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
} from 'rxjs';
import { UsuarioLista } from 'src/app/models/usuario/usuario-lista';
import { UsuarioLogado } from 'src/app/models/usuario/usuario-logado';
import { AuthService } from 'src/app/services/auth-service';
import { PesquisaService } from 'src/app/services/pesquisa-service';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss'],
})
export class PesquisaComponent {
  listaPesquisa: UsuarioLista[] = [];
  usuarioLogado: UsuarioLogado | null = null;
  carregando: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private pesquisaService: PesquisaService,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {}

  pesquisaSubject = new Subject<string>();

  async ionViewWillEnter() {
    this.usuarioLogado = this.authService.usuarioLogado();
    this.pesquisaSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((valor) => valor.trim().length > 0),
        switchMap((valor) => this.pesquisaService.buscarUsuario(valor)),
      )
      .subscribe({
        next: async (res: UsuarioLista[]) => {
          this.listaPesquisa = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  async pesquisar(event: any) {
    this.carregando = true;

    const valor = event.target.value;

    if (!valor.trim()) {
      this.listaPesquisa = [];
      return;
    }

    this.pesquisaSubject.next(valor);
  }

  async irPara(usuarioId: number) {
    await this.modalCtrl.dismiss();
    this.router.navigate([`/user/${usuarioId}`]);
  }

  async fechar() {
    this.pesquisaSubject.closed;
    this.listaPesquisa = [];
    await this.modalCtrl.dismiss();
  }
}

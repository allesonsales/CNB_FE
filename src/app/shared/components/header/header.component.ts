import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular/standalone';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
} from 'rxjs';
import { PesquisaComponent } from 'src/app/features/social/modals/pesquisa/pesquisa.component';
import { UsuarioLista } from 'src/app/models/usuario/usuario-lista';
import { UsuarioLogado } from 'src/app/models/usuario/usuario-logado';
import { AuthService } from 'src/app/services/auth-service';
import { PesquisaService } from 'src/app/services/pesquisa-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './header.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() mostrarPesquisar: boolean = true;
  @Input() mostrarFoto: boolean = true;
  usuarioLogado: UsuarioLogado | null = null;

  get fotoUrl(): string {
    return `${environment.apiUrl}${this.usuarioLogado?.foto}`;
  }

  constructor(
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private pesquisaService: PesquisaService,
  ) {}

  listaUsuarios: UsuarioLista[] = [];

  pesquisaSubject = new Subject<string>();

  ngOnInit() {
    this.usuarioLogado = this.authService.usuarioLogado();
    this.pesquisaSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter((valor) => valor.trim().length > 0),
        switchMap((valor) => this.pesquisaService.buscarUsuario(valor)),
      )
      .subscribe({
        next: (res: UsuarioLista[]) => {
          this.listaUsuarios = res;
        },
        error: (err) => {},
      });
  }

  abrirMenu() {
    this.menuCtrl.open('first-menu');
  }

  async abrirPesquisa() {
    const modal = await this.modalCtrl.create({
      component: PesquisaComponent,
      componentProps: { listaPesquisa: this.listaUsuarios },
    });

    await modal.present();
  }
}

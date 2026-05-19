import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PopoverController } from '@ionic/angular/standalone';
import { AmizadeStatusRes } from 'src/app/models/amizade/amizade-status';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { AmizadeService } from 'src/app/services/amizade-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { AcoesPerfilComponent } from '../acoes-perfil/acoes-perfil.component';
import { UsuarioLogado } from 'src/app/models/usuario/usuario-logado';
import { Perfil } from 'src/app/models/perfil/perfil';
import { AuthService } from 'src/app/services/auth-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-perfil',
  templateUrl: './header-perfil.component.html',
  styleUrls: ['./header-perfil.component.scss'],
  imports: [IonicModule],
})
export class HeaderPerfilComponent implements OnChanges {
  @Input() dadosPerfil: Perfil | null = null;
  usuario = this.dadosPerfil?.usuario;
  isMeuPerfil = this.dadosPerfil?.isMeuPerfil;
  carregando: boolean = false;
  amizadeStatus = AmizadeStatusRes;
  usuarioLogado: UsuarioLogado | null = null;

  get fotoUrl(): string {
    return `${environment.apiUrl}${this.usuario?.foto || 'images/perfil.png'}`;
  }

  constructor(
    private popOverCtrl: PopoverController,
    private authService: AuthService,
    private amizadeService: AmizadeService,
    private mensagemService: MensagemService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.usuarioLogado = this.authService.usuarioLogado();
    if (changes['dadosPerfil']) {
      this.usuario = this.dadosPerfil?.usuario;
      this.isMeuPerfil = this.dadosPerfil?.isMeuPerfil;
    }
  }

  adicionarAmigo() {
    if (!this.dadosPerfil?.usuario) return;

    const dadosAtuais = this.dadosPerfil;

    this.carregando = true;

    this.amizadeService.adicionarAmigo(this.dadosPerfil.usuario.id).subscribe({
      next: (res: FlashMessage) => {
        this.carregando = false;

        this.dadosPerfil = {
          ...dadosAtuais,
          amizade: {
            status: this.amizadeStatus.PENDENTE,
          },
        };

        this.mensagemService.enviarMensagem(res);
      },
      error: (err: FlashMessageError) => {
        this.carregando = false;
        console.log(err);
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  deletarAmigo() {
    if (!this.dadosPerfil?.usuario) return;

    const dadosAtuais = this.dadosPerfil;

    this.carregando = true;

    this.amizadeService
      .atualizarAmizade(
        this.dadosPerfil.usuario.id,
        this.amizadeStatus.DESFEITA,
      )
      .subscribe({
        next: (res: FlashMessage) => {
          this.carregando = false;

          this.dadosPerfil = {
            ...dadosAtuais,
            amizade: {
              status: this.amizadeStatus.DESFEITA,
            },
          };

          this.mensagemService.enviarMensagem(res);
        },
        error: (err: FlashMessageError) => {
          this.carregando = false;
          this.mensagemService.enviarMensagem(err.error);
        },
      });
  }

  cancelarPedidoAmizade() {
    if (!this.dadosPerfil?.usuario || !this.dadosPerfil.amizade?.id) return;

    console.log('dados perfil', this.dadosPerfil);

    const dadosAtuais = this.dadosPerfil;

    this.carregando = true;

    this.amizadeService
      .atualizarAmizade(
        this.dadosPerfil.amizade?.id,
        this.amizadeStatus.CANCELADA,
      )
      .subscribe({
        next: (res: FlashMessage) => {
          this.carregando = false;

          this.dadosPerfil = {
            ...dadosAtuais,
            amizade: {
              status: this.amizadeStatus.PENDENTE,
            },
          };

          this.mensagemService.enviarMensagem(res);
        },
        error: (err: FlashMessageError) => {
          this.carregando = false;
          this.mensagemService.enviarMensagem(err.error);
        },
      });
  }

  async abrirPopOver(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: AcoesPerfilComponent,
      componentProps: {
        usuario: this.usuario,
        isMeuPerfil: this.isMeuPerfil,
        amizadeStatus: this.dadosPerfil?.amizade?.status,
      },
      event: ev,
      alignment: 'end',
      side: 'bottom',
    });

    await popOver.present();
  }
}

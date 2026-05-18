import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PopoverController } from '@ionic/angular/standalone';
import { tap } from 'rxjs';
import { Amizade } from 'src/app/models/amizade/amizade';
import { AmizadeStatusRes } from 'src/app/models/amizade/amizade-status';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioResumido } from 'src/app/models/usuario/usuario-resumido';
import { AmizadeService } from 'src/app/services/amizade-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { AcoesPerfilComponent } from '../acoes-perfil/acoes-perfil.component';

@Component({
  selector: 'app-header-perfil',
  templateUrl: './header-perfil.component.html',
  styleUrls: ['./header-perfil.component.scss'],
  imports: [IonicModule],
})
export class HeaderPerfilComponent implements OnInit {
  @Input() usuario: UsuarioResumido | null = null;
  @Input() amizade: Amizade | null = null;
  carregando: boolean = false;

  amizadeStatus = AmizadeStatusRes;

  constructor(
    private amizadeService: AmizadeService,
    private mensagemService: MensagemService,
    private popOverCtrl: PopoverController,
  ) {}

  ngOnInit() {}

  adicionarAmigo() {
    if (!this.usuario?.id) return;

    this.carregando = true;

    this.amizadeService
      .adicionarAmigo(this.usuario.id)
      .pipe(tap(() => (this.carregando = false)))
      .subscribe({
        next: (res: FlashMessage) => {
          console.log('adicionando amigo...');
          this.mensagemService.enviarMensagem(res);
        },
        error: (err: FlashMessageError) => {
          this.mensagemService.enviarMensagem(err.error);
        },
      });
  }

  deletarAmigo() {
    if (!this.usuario?.id) return;

    this.carregando = true;

    this.amizadeService
      .atualizarAmizade(this.usuario.id, this.amizadeStatus.DESFEITA)
      .pipe(tap(() => (this.carregando = false)))
      .subscribe({
        next: (res: FlashMessage) => {
          this.mensagemService.enviarMensagem(res);
        },
        error: (err: FlashMessageError) => {
          this.mensagemService.enviarMensagem(err.error);
        },
      });
  }

  cancelarPedidoAmizade() {
    if (!this.amizade?.id) return;

    this.carregando = true;

    this.amizadeService
      .atualizarAmizade(this.amizade.id, this.amizadeStatus.CANCELADA)
      .pipe(tap(() => (this.carregando = false)))
      .subscribe({
        next: (res: FlashMessage) => {
          this.mensagemService.enviarMensagem(res);
        },
        error: (err: FlashMessageError) => {
          this.mensagemService.enviarMensagem(err.error);
        },
      });
  }

  async abrirPopOver(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: AcoesPerfilComponent,
      event: ev,
      alignment: 'end',
      side: 'bottom',
    });

    await popOver.present();
  }
}

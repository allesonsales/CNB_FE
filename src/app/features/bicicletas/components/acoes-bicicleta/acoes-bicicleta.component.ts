import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonicModule,
  LoadingController,
  PopoverController,
} from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { ModalIniciarTransferenciaComponent } from '../../modals/modal-iniciar-transferencia/modal-iniciar-transferencia.component';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { MensagemService } from 'src/app/services/mensagem-service';
import { ModalRouboBicicletaComponent } from '../../modals/modal-roubo-bicicleta/modal-roubo-bicicleta.component';
import { ModalEditarBicicletaComponent } from '../../modals/modal-editar-bicicleta/modal-editar-bicicleta.component';
import { BicicletaLista } from 'src/app/models/bicicleta/Bicicleta';
import { BicicletaStatus } from 'src/app/models/bicicleta/BicicletaStatus';
import { RouboService } from 'src/app/services/roubo-service';
import { QrCodeBicicletaComponent } from '../qr-code-bicicleta/qr-code-bicicleta.component';

@Component({
  selector: 'app-acoes-bicicleta',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './acoes-bicicleta.component.html',
  styleUrls: ['./acoes-bicicleta.component.scss'],
})
export class AcoesBicicletaComponent {
  @Input() bicicleta!: BicicletaLista;
  @Output() acao = new EventEmitter<{ tipo: string; id: number }>();

  menuAberto: boolean = false;
  evento: any;
  bicicletaStatus = BicicletaStatus;

  constructor(
    private bicicletaService: BicicletaService,
    private mensagemService: MensagemService,
    private rouboService: RouboService,
    private router: Router,
    private modalCtrl: ModalController,
    private popOverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {}

  async abrirModalTransferencia() {
    this.popOverCtrl.dismiss();

    const modal = await this.modalCtrl.create({
      component: ModalIniciarTransferenciaComponent,
      componentProps: { bicicletaId: this.bicicleta.id },
    });

    await modal.present();
  }

  async abrirModalRoubo() {
    this.popOverCtrl.dismiss();

    const modal = await this.modalCtrl.create({
      component: ModalRouboBicicletaComponent,
      componentProps: { bicicletaId: this.bicicleta.id },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.bicicletaService.bicicletas.update((bicicletas) =>
        bicicletas.map((bicicleta) =>
          bicicleta.id === this.bicicleta.id
            ? {
                ...bicicleta,
                status: BicicletaStatus.ROUBADA,
              }
            : bicicleta,
        ),
      );
    }
  }

  async abrirModalEditar() {
    this.popOverCtrl.dismiss();

    const modal = await this.modalCtrl.create({
      component: ModalEditarBicicletaComponent,
      componentProps: { bicicleta: this.bicicleta },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.bicicletaService.bicicletas.update((lista) =>
        lista.map((bicicleta) => (bicicleta.id == data.id ? data : bicicleta)),
      );
    }
  }

  async abrirAlertaExcluir() {
    await this.popOverCtrl.dismiss('excluir');

    const alerta = await this.alertCtrl.create({
      animated: true,
      message: 'Tem certeza que deseja excluir esta bicicleta?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluirBicicleta();
          },
        },
      ],
    });

    await alerta.present();
  }

  async autenticarBicicleta(numeroSerie: string) {
    await this.popOverCtrl.dismiss();
    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'bubbles',
      message: 'Autenticando bicicleta...',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.bicicletaService.autenticarBicicleta(numeroSerie).subscribe({
      next: async (res) => {
        console.log(res);
        await loading.dismiss();
        const modal = await this.modalCtrl.create({
          component: QrCodeBicicletaComponent,
          componentProps: { qrcode: res.qrcode },
        });

        await modal.present();
      },
      error: async (err: FlashMessageError) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  async excluirBicicleta() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      message: 'Excluindo bicicleta',
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.bicicletaService.excluirBicicleta(this.bicicleta.id).subscribe({
      next: async (res: FlashMessage) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem(res);
        this.bicicletaService.bicicletas.update((lista) =>
          lista.filter((b) => b.id != this.bicicleta.id),
        );
      },
      error: async (err: FlashMessageError) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  async abrirAlertaRecuperada() {
    await this.popOverCtrl.dismiss();
    const alertRecuperada = await this.alertCtrl.create({
      animated: true,
      message: 'Deseja mesmo informar que a bicicletea foi recuperada?',
      cssClass: 'custom-loading',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.marcarComoRecuperada();
          },
        },
      ],
    });

    await alertRecuperada.present();
  }

  async marcarComoRecuperada() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      message: 'Recuperando bicicleta...',
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.rouboService.marcarComoRecuperada(this.bicicleta.id).subscribe({
      next: async (res: FlashMessage) => {
        await loading.dismiss();
        console.log(res);
        this.mensagemService.enviarMensagem(res);

        this.bicicletaService.bicicletas.update((lista) =>
          lista.map((bicicleta) =>
            bicicleta.id == this.bicicleta.id
              ? { ...bicicleta, status: this.bicicletaStatus.PADRAO }
              : bicicleta,
          ),
        );
      },
      error: async (err: FlashMessageError) => {
        console.log(err);
        await loading.dismiss();
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  irPara(rota: string, id: any) {
    this.popOverCtrl.dismiss();
    this.router.navigate([rota, id]);
  }
}

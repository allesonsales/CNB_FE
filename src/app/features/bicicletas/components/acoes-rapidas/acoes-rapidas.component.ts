import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';
import { ModalIniciarTransferenciaComponent } from '../../modals/modal-iniciar-transferencia/modal-iniciar-transferencia.component';
import { ModalRouboBicicletaComponent } from '../../modals/modal-roubo-bicicleta/modal-roubo-bicicleta.component';
import { BicicletaStatus } from 'src/app/models/bicicleta/BicicletaStatus';
import { MensagemService } from 'src/app/services/mensagem-service';
import { RouboService } from 'src/app/services/roubo-service';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acoes-rapidas',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './acoes-rapidas.component.html',
  styleUrls: ['./acoes-rapidas.component.scss'],
})
export class AcoesRapidasComponent {
  @Input() bicicleta!: Bicicleta;
  bicicletaStatus = BicicletaStatus;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private mensagemService: MensagemService,
    private loadingCtrl: LoadingController,
    private rouboService: RouboService,
    private bicicletaService: BicicletaService,
    private router: Router,
  ) {}

  async abrirModalTransferencia() {
    const modal = await this.modalCtrl.create({
      component: ModalIniciarTransferenciaComponent,
      componentProps: { bicicletaId: this.bicicleta.id },
    });

    await modal.present();
  }

  async abrirModalRoubo() {
    const modal = await this.modalCtrl.create({
      component: ModalRouboBicicletaComponent,
      componentProps: { bicicletaId: this.bicicleta.id },
    });

    await modal.present();
  }

  async abrirAlertaRecuperada() {
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
        await this.router.navigate(['/bicicletas']);
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
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, PopoverController } from '@ionic/angular';
import { BicicletaLista } from 'src/app/models/bicicleta/Bicicleta';
import { BicicletaStatus } from 'src/app/models/bicicleta/BicicletaStatus';
import { ModalIniciarTransferenciaComponent } from '../../modals/modal-iniciar-transferencia/modal-iniciar-transferencia.component';
import { ModalController } from '@ionic/angular/standalone';
import { AcoesBicicletaComponent } from '../acoes-bicicleta/acoes-bicicleta.component';

@Component({
  selector: 'app-bicicleta',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './bicicleta.component.html',
  styleUrls: ['./bicicleta.component.scss'],
})
export class BicicletaComponent {
  @Input() bicicletaLista!: BicicletaLista;
  @Output() acaoEmit = new EventEmitter<{ tipo: string; id: number }>();

  bicicletaStatus = BicicletaStatus;

  menuAberto: boolean = false;
  evento: any;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private popOverCtrl: PopoverController,
  ) {}

  async abrirModalTransferencia() {
    const modal = await this.modalCtrl.create({
      component: ModalIniciarTransferenciaComponent,
      componentProps: { bicicleta: this.bicicletaLista },
    });

    await modal.present();

    this.menuAberto = false;
  }

  async abrirPopOver(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: AcoesBicicletaComponent,
      componentProps: { bicicleta: this.bicicletaLista },
      event: ev,
      alignment: 'end',
      side: 'bottom',
    });

    await popOver.present();

    const { data } = await popOver.onDidDismiss();

    if (data == 'excluir') {
    }
  }

  emitirAcao(tipo: string) {
    this.acaoEmit.emit({ tipo: tipo, id: this.bicicletaLista.id });
    this.menuAberto = false;
  }

  abrirMenu(ev: any) {
    this.evento = ev;
    this.menuAberto = true;
  }

  irPara(rota: string, id: number) {
    this.menuAberto = false;
    this.router.navigate([rota, id]);
  }
}

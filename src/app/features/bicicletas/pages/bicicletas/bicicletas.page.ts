import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { BicicletaLista } from 'src/app/models/bicicleta/Bicicleta';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { BicicletaComponent } from '../../components/bicicleta/bicicleta.component';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { MensagemService } from 'src/app/services/mensagem-service';
import { PopoverController } from '@ionic/angular/standalone';
import { AcoesBicicletaComponent } from '../../components/acoes-bicicleta/acoes-bicicleta.component';
import { BotaoAdicionarComponent } from 'src/app/features/social/components/botao-adicionar/botao-adicionar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bicicletas',
  templateUrl: './bicicletas.page.html',
  styleUrls: ['./bicicletas.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    BicicletaComponent,
    BotaoAdicionarComponent,
    RouterModule,
  ],
})
export class BicicletasPage {
  bicicletaSelecionadaId: number | null = null;

  constructor(
    public bicicletaService: BicicletaService,
    private mensagemService: MensagemService,
    private popoverCtrl: PopoverController,
  ) {}

  bicicletas = this.bicicletaService.bicicletas;

  ionViewWillEnter() {
    this.bicicletaService.buscarBicicletas().subscribe({
      next: (bicicletas: BicicletaLista[]) => {
        this.bicicletaService.bicicletas.set(bicicletas);
        bicicletas;
      },
      error: (err) => {},
    });
  }

  async abrirPopOver(ev: any, bicicleta: BicicletaLista) {
    const popOver = await this.popoverCtrl.create({
      component: AcoesBicicletaComponent,
      componentProps: { bicicleta },
      event: ev,
      alignment: 'end',
      side: 'bottom',
    });

    await popOver.present();

    const { data } = await popOver.onDidDismiss();

    if (data?.acao === 'excluir') {
      this.excluirBicicleta(data.id);
    }
  }

  excluirBicicleta(id: number) {
    this.bicicletaService.excluirBicicleta(id).subscribe({
      next: (res: FlashMessage) => {
        this.mensagemService.enviarMensagem(res);
        this.bicicletas.update((lista) =>
          lista.filter((bicicleta) => bicicleta.id != id),
        );
      },
      error: (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }
}

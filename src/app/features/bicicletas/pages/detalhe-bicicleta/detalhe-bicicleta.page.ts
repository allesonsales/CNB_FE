import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { AcoesRapidasComponent } from '../../components/acoes-rapidas/acoes-rapidas.component';
import { TransacaoComponent } from '../../components/transacao/transacao.component';
import { BicicletaDetalheComponent } from '../../components/bicicleta-detalhe/bicicleta-detalhe.component';
import { AcoesBicicletaComponent } from '../../components/acoes-bicicleta/acoes-bicicleta.component';
import { PopoverController } from '@ionic/angular/standalone';
import { ModalRouboBicicletaComponent } from '../../modals/modal-roubo-bicicleta/modal-roubo-bicicleta.component';

@Component({
  selector: 'app-detalhe-bicicleta',
  templateUrl: './detalhe-bicicleta.page.html',
  styleUrls: ['./detalhe-bicicleta.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    AcoesRapidasComponent,
    TransacaoComponent,
    BicicletaDetalheComponent,
  ],
})
export class DetalheBicicletaPage implements OnInit {
  bicicleta: Bicicleta | null = null;
  menuAberto: boolean = false;
  evento: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private popOverCtrl: PopoverController,
    private bicicletaService: BicicletaService,
    private mensagemService: MensagemService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const numeroSerie = String(this.route.snapshot.paramMap.get('numeroSerie'));
    this.buscarDetalhesBicicleta(numeroSerie);
  }

  buscarDetalhesBicicleta(numeroSerie: string) {
    this.bicicletaService.buscarBicicletaNumeroSerie(numeroSerie).subscribe({
      next: (bicicleta: Bicicleta) => {
        this.bicicleta = bicicleta;
      },
      error: (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  async abrirPopOver(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: AcoesBicicletaComponent,
      componentProps: { bicicleta: this.bicicleta },
      event: ev,
      alignment: 'end',
      side: 'bottom',
    });

    await popOver.present();
  }

  abrirModalRoubo() {
    this.popOverCtrl.dismiss();

    const modal = this.modalCtrl.create({
      component: ModalRouboBicicletaComponent,
      componentProps: { bicicleta: this.bicicleta },
    });
  }

  excluirBicicleta() {
    if (this.bicicleta == null) return;

    this.bicicletaService.excluirBicicleta(this.bicicleta.id).subscribe({
      next: (res: FlashMessage) => {
        this.mensagemService.enviarMensagem(res);
        this.bicicletaService.bicicletas.update((lista) =>
          lista.filter((b) => b.id != this.bicicleta?.id),
        );
        this.router.navigateByUrl('/bicicletas', { replaceUrl: true });
      },
      error: (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  irPara(rota: string, id: any) {
    this.menuAberto = false;
    this.router.navigate([rota, id]);
  }
}

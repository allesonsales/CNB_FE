import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';
import { FlashMessageError } from 'src/app/models/Response';
import { MensagemService } from 'src/app/services/mensagem-service';

@Component({
  selector: 'app-consulta-publica-qr-code',
  templateUrl: './consulta-publica-qr-code.page.html',
  styleUrls: ['./consulta-publica-qr-code.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ConsultaPublicaQrCodePage {
  bicicleta!: Bicicleta;

  constructor(
    private route: ActivatedRoute,
    private bicicletaService: BicicletaService,
    private mensagemService: MensagemService,
  ) {}

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
}

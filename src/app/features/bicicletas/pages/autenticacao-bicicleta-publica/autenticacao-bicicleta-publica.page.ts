import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { ActivatedRoute } from '@angular/router';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';
import { FlashMessageError } from 'src/app/models/Response';
import { MensagemService } from 'src/app/services/mensagem-service';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { ConsultaPublicaBicicletaNaoEncontradaComponent } from '../../components/consulta-publica-bicicleta-nao-encontrada/consulta-publica-bicicleta-nao-encontrada.component';
import { ConsultaPublicaBicicletaRoubadaComponent } from '../../components/consulta-publica-bicicleta-roubada/consulta-publica-bicicleta-roubada.component';
import { BicicletaStatus } from 'src/app/models/bicicleta/BicicletaStatus';
import { ConsultaPublicaBicicletaAutenticadaComponent } from '../../components/consulta-publica-bicicleta-autenticada/consulta-publica-bicicleta-autenticada.component';
import { BicicletaConsultaPublica } from 'src/app/models/bicicleta/bicicleta-consulta-publica';
import { ConsultaPublicaService } from 'src/app/services/consulta-publica-service';

@Component({
  selector: 'app-autenticacao-bicicleta-publica',
  templateUrl: './autenticacao-bicicleta-publica.page.html',
  styleUrls: ['./autenticacao-bicicleta-publica.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ConsultaPublicaBicicletaNaoEncontradaComponent,
    ConsultaPublicaBicicletaRoubadaComponent,
    ConsultaPublicaBicicletaAutenticadaComponent,
    BackgroundComponent,
  ],
})
export class AutenticacaoBicicletaPublicaPage implements OnInit {
  isMobile: boolean = false;
  numeroSerie!: string | null;
  bicicleta: BicicletaConsultaPublica | null = null;
  dataAtual = Date.now();

  statusBicicleta = BicicletaStatus;

  constructor(
    private consultaPublicaService: ConsultaPublicaService,
    private routerActive: ActivatedRoute,
    private mensagemService: MensagemService,
  ) {}

  ngOnInit() {
    const largutaTela = window.innerWidth;

    if (largutaTela <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    this.numeroSerie = this.routerActive.snapshot.paramMap.get('numeroSerie');

    if (!this.numeroSerie) return;

    this.consultaPublicaService
      .consultarNumeroSerie(this.numeroSerie)
      .subscribe({
        next: (res: BicicletaConsultaPublica) => {
          this.bicicleta = res;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { MensagemService } from 'src/app/services/mensagem-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-publica',
  templateUrl: './consulta-publica.page.html',
  styleUrls: ['./consulta-publica.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BackgroundComponent],
})
export class ConsultaPublicaPage implements OnInit {
  isMobile: boolean = false;
  numeroSerie: string | null = null;
  constructor(
    private mensagemService: MensagemService,
    private router: Router,
  ) {}

  ngOnInit() {
    const largutaTela = window.innerWidth;

    if (largutaTela <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  consultar() {
    if (!this.numeroSerie) {
      this.mensagemService.enviarMensagem({
        mensagem: 'Informe o número de série da bicicleta.',
        status: 'error',
      });

      return;
    }

    const numeroSerie = this.numeroSerie;
    this.router.navigate(['/consulta-publica', numeroSerie]);
    this.numeroSerie = '';
  }
}

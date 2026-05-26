import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import * as leaf from 'leaflet';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';
import { BicicletaStatus } from 'src/app/models/bicicleta/BicicletaStatus';
import { MensagemService } from 'src/app/services/mensagem-service';

@Component({
  selector: 'app-localizacao-bicicleta',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './localizacao-bicicleta.component.html',
  styleUrls: ['./localizacao-bicicleta.component.scss'],
})
export class LocalizacaoBicicletaComponent implements AfterViewInit {
  @Input() bicicleta!: Bicicleta;
  map: any;
  localizacao: any;
  altitude: any;
  latitude: any;
  longitude: any;
  statusBicicleta = BicicletaStatus;

  constructor(
    private loadingCtrl: LoadingController,
    private mensagemService: MensagemService,
    private modalCtrl: ModalController,
  ) {}

  ngAfterViewInit() {
    this.iniciarMapa();
  }

  async iniciarMapa() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      message: 'Buscando localização...',
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    const iconeBike = leaf.icon({
      iconUrl: 'assets/icon/pin-locate.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    await loading.present();

    this.localizacao = navigator.geolocation.getCurrentPosition(
      async (posicao) => {
        await loading.dismiss();
        this.latitude = posicao.coords.latitude;
        this.longitude = posicao.coords.longitude;
        this.altitude = posicao.coords.altitude;
        this.map = leaf.map('map').setView([this.latitude, this.longitude], 15);

        leaf
          .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap',
          })
          .addTo(this.map);

        leaf
          .marker([this.latitude, this.longitude], { icon: iconeBike })
          .addTo(this.map)
          .bindPopup('Sua bicicleta está aqui.')
          .openPopup();
      },
      async (err) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem({
          status: 'error',
          mensagem: 'Erro ao buscar localização.',
        });
      },
    );
  }

  voltar() {
    this.modalCtrl.dismiss();
  }
}

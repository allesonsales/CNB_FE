import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-qr-code-bicicleta',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './qr-code-bicicleta.component.html',
  styleUrls: ['./qr-code-bicicleta.component.scss'],
})
export class QrCodeBicicletaComponent implements OnInit {
  @Input() qrcode!: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  downloadQr(qrBase64: string, nome = 'qrcode.png') {
    const link = document.createElement('a');

    link.href = qrBase64;
    link.download = nome;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async voltar() {
    await this.modalCtrl.dismiss();
  }
}

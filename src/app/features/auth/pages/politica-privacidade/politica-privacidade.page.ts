import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';

@Component({
  selector: 'app-politica-privacidade',
  templateUrl: './politica-privacidade.page.html',
  styleUrls: ['./politica-privacidade.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BackgroundComponent],
})
export class PoliticaPrivacidadePage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  voltar() {
    this.navCtrl.back();
  }
}

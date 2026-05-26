import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Conquista } from 'src/app/models/conquista/conquista';

@Component({
  selector: 'app-conquistas-perfil',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './conquistas-perfil.component.html',
  styleUrls: ['./conquistas-perfil.component.scss'],
})
export class ConquistasPerfilComponent implements OnInit {
  conquistas: Conquista[] = [];
  constructor() {}

  ngOnInit() {
    this.conquistas = [
      {
        id: 1,
        imagem: '../../../../../assets/icon/badges/antes_galo.svg',
        titulo: 'Antes do galo cantar',
      },
      {
        id: 2,
        imagem: '../../../../../assets/icon/badges/assustou_coruja.svg',
        titulo: 'Assustou a coruja',
      },
      {
        id: 2,
        imagem: '../../../../../assets/icon/badges/galatico.svg',
        titulo: 'Pedalou 1000km',
      },
    ];
  }
}

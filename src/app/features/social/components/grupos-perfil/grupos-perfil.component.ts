import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-grupos-perfil',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './grupos-perfil.component.html',
  styleUrls: ['./grupos-perfil.component.scss'],
})
export class GruposPerfilComponent implements OnInit {
  grupos = [];
  constructor() {}

  ngOnInit() {}
}

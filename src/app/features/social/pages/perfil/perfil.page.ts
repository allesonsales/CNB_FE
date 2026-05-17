import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TabSocialComponent } from 'src/app/shared/components/tab-social/tab-social.component';
import { HeaderPerfilComponent } from '../../components/header-perfil/header-perfil.component';
import { UsuarioService } from 'src/app/services/usuario-service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TabSocialComponent,
    HeaderPerfilComponent,
  ],
})
export class PerfilPage {
  usuario: Usuario | null = null;

  segmentos = [
    {
      icon: 'image-outline',
      content: 'fotos',
    },
    {
      icon: 'people-outline',
      content: 'grupos',
    },
    {
      icon: 'ribbon-outline',
      content: 'conquistas',
    },
  ];

  constructor(private usuarioService: UsuarioService) {}

  ionViewWillEnter() {}
}

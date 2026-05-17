import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-header-perfil',
  templateUrl: './header-perfil.component.html',
  styleUrls: ['./header-perfil.component.scss'],
  imports: [IonicModule],
})
export class HeaderPerfilComponent implements OnInit {
  @Input() usuario: Usuario | null = null;
  constructor() {}

  ngOnInit() {}
}

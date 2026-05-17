import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Bicicleta, BicicletaLista } from 'src/app/models/bicicleta/Bicicleta';
import { BicicletaService } from 'src/app/services/bicicleta-service';

@Component({
  selector: 'app-lista-bicicleta',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './lista-bicicleta.component.html',
  styleUrls: ['./lista-bicicleta.component.scss'],
})
export class ListaBicicletaComponent {
  @Input() bicicletas: BicicletaLista[] = [];

  constructor(private bicicletaService: BicicletaService) {}
}

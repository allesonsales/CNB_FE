import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-consulta-publica-bicicleta-nao-encontrada',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './consulta-publica-bicicleta-nao-encontrada.component.html',
  styleUrls: ['./consulta-publica-bicicleta-nao-encontrada.component.scss'],
})
export class ConsultaPublicaBicicletaNaoEncontradaComponent implements OnInit {
  dataAtual = Date.now();
  constructor() {}

  ngOnInit() {}
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';
import { BicicletaConsultaPublica } from 'src/app/models/bicicleta/bicicleta-consulta-publica';
import { BicicletaCategoria } from 'src/app/models/bicicleta/BicicletaCategoria';
import { BicicletaCor } from 'src/app/models/bicicleta/BicicletaCor';
import { BicicletaMarca } from 'src/app/models/bicicleta/BicicletaMarca';
import { BicicletaStatus } from 'src/app/models/bicicleta/BicicletaStatus';
import { bicicletaCategoraiLabel } from 'src/app/models/bicicleta/labels/bicicleta-categoria';
import { BicicletaCorLabel } from 'src/app/models/bicicleta/labels/bicicleta-cor';
import { BicicletaMarcaLabel } from 'src/app/models/bicicleta/labels/bicicleta-marca';

@Component({
  selector: 'app-consulta-publica-bicicleta-roubada',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './consulta-publica-bicicleta-roubada.component.html',
  styleUrls: ['./consulta-publica-bicicleta-roubada.component.scss'],
})
export class ConsultaPublicaBicicletaRoubadaComponent implements OnInit {
  @Input() bicicleta: BicicletaConsultaPublica | null = null;
  statusBicicleta = Object.values(BicicletaStatus);
  corBicicleta = Object.values(BicicletaCor);
  categoriaBicicleta = Object.values(BicicletaCategoria);
  marcaBicicleta = Object.values(BicicletaMarca);

  labelCor = BicicletaCorLabel;
  labelMarca = BicicletaMarcaLabel;
  labelCategoria = bicicletaCategoraiLabel;
  dataAtual = Date.now();
  constructor() {}

  ngOnInit() {}
}

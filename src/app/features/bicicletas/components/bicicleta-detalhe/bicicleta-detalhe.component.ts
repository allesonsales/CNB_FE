import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';

@Component({
  selector: 'app-bicicleta-detalhe',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './bicicleta-detalhe.component.html',
  styleUrls: ['./bicicleta-detalhe.component.scss'],
})
export class BicicletaDetalheComponent implements OnInit {
  @Input() bicicleta: Bicicleta | null = null;

  constructor() {}

  ngOnInit() {}
}

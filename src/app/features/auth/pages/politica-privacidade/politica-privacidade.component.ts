import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';

@Component({
  selector: 'app-politica-privacidade',
  standalone: true,
  imports: [IonicModule, BackgroundComponent],
  templateUrl: './politica-privacidade.component.html',
  styleUrls: ['./politica-privacidade.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PoliticaPrivacidadeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

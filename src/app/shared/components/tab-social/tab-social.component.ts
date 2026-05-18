import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab-social',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './tab-social.component.html',
  styleUrls: ['./tab-social.component.scss'],
})
export class TabSocialComponent implements OnInit {
  @Input() segmentos: {
    icon: string;
    content: string;
    acao: string;
  }[] = [];

  @Output() acao = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  verFotos() {
    this.acao.emit('fotos');
  }

  verGrupos() {
    this.acao.emit('grupos');
  }
  verConquistas() {
    this.acao.emit('conquistas');
  }
}

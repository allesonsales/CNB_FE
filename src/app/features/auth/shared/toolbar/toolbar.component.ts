import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() acaoVoltar = new EventEmitter<void>();

  voltar() {
    this.acaoVoltar.emit();
  }

  constructor() {}
}

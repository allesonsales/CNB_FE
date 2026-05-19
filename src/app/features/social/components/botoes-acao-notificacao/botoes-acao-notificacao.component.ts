import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AmizadeAcao } from 'src/app/models/amizade/amizade-acao';
import { NotificacaoTipo } from 'src/app/models/NotificacaoTipo';
import { TransacaoAcao } from 'src/app/models/transacao/transacao-acao';

@Component({
  selector: 'app-botoes-acao-notificacao',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './botoes-acao-notificacao.component.html',
  styleUrls: ['./botoes-acao-notificacao.component.scss'],
})
export class BotoesAcaoNotificacaoComponent {
  @Input() tipoNotificacao!: NotificacaoTipo;
  @Output() acao = new EventEmitter<TransacaoAcao | AmizadeAcao>();

  notificacaoTipo = NotificacaoTipo;

  constructor() {}

  emitirAcaoAceitar() {
    if (this.tipoNotificacao.includes('TRANSACAO')) {
      this.acao.emit(TransacaoAcao.ACEITAR);
    } else if (this.tipoNotificacao === this.notificacaoTipo.AMIZADE) {
      this.acao.emit(AmizadeAcao.ACEITA);
    }
  }

  emitirAcaoCancelar() {
    if (this.tipoNotificacao.includes('TRANSACAO')) {
      this.acao.emit(TransacaoAcao.CANCELAR);
    } else if (this.tipoNotificacao === this.notificacaoTipo.AMIZADE) {
      this.acao.emit(AmizadeAcao.RECUSADA);
    }
  }
}

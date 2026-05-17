import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NotificacaoTipo } from 'src/app/models/NotificacaoTipo';
import { TransacaoAcao } from 'src/app/models/transacao/transacao-acao';

@Component({
  selector: 'app-botoes-acao-notificacao',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './botoes-acao-notificacao.component.html',
  styleUrls: ['./botoes-acao-notificacao.component.scss'],
})
export class BotoesAcaoNotificacaoComponent implements OnInit {
  @Input() tipoNotificacao!: NotificacaoTipo;
  @Output() acao = new EventEmitter<TransacaoAcao>();

  notificacaoTipo = NotificacaoTipo;

  constructor() {}

  emitirAcaoAceitar() {
    this.acao.emit(TransacaoAcao.ACEITAR);
  }

  emitirAcaoCancelar() {
    this.acao.emit(TransacaoAcao.CANCELAR);
  }

  ngOnInit() {}
}

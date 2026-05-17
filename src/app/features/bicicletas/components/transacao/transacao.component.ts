import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { getUsuarioLogado } from 'src/app/features/auth/utils/getUsuarioLogado';
import { Transacao } from 'src/app/models/transacao/transacao';
import { TransacaoStatus } from 'src/app/models/transacao/transacao-status';

@Component({
  selector: 'app-transacao',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.scss'],
})
export class TransacaoComponent {
  @Input() transacao!: Transacao;
  usuarioLogado = getUsuarioLogado;
  transacaoStatus = TransacaoStatus;

  constructor() {}
}

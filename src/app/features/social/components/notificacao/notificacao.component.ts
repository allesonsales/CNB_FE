import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Notificacao } from 'src/app/models/notificacoes/Notificacao';
import { BotoesAcaoNotificacaoComponent } from '../botoes-acao-notificacao/botoes-acao-notificacao.component';
import { TransacaoService } from 'src/app/services/transacao-service';
import { NotificacaoTipo } from 'src/app/models/NotificacaoTipo';
import { FlashMessageError } from 'src/app/models/Response';
import { MensagemService } from 'src/app/services/mensagem-service';
import { NotificacaoService } from 'src/app/services/notificacao-service';
import { TransacaoAcao } from 'src/app/models/transacao/transacao-acao';
import { switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AmizadeAcao } from 'src/app/models/amizade/amizade-acao';
import { AmizadeService } from 'src/app/services/amizade-service';
import { AmizadeStatusRes } from 'src/app/models/amizade/amizade-status';
import { Amizade } from 'src/app/models/amizade/amizade';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [IonicModule, CommonModule, BotoesAcaoNotificacaoComponent],
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss'],
})
export class NotificacaoComponent implements OnChanges {
  @Input() notificacao!: Notificacao;

  NotificacaoTipo = NotificacaoTipo;
  transacaoAcao = TransacaoAcao;

  get fotoUrl() {
    return `${environment.apiUrl}${this.notificacao.thumbnail}`;
  }

  constructor(
    private transacaoService: TransacaoService,
    private mensagemService: MensagemService,
    private notificacaoService: NotificacaoService,
    private amizadeService: AmizadeService,
  ) {}

  ngOnChanges() {
    console.log(this.notificacao);
    console.log(this.fotoUrl);
  }

  getIcon(tipo: NotificacaoTipo) {
    switch (tipo) {
      case NotificacaoTipo.SOCIAL:
        return 'heart';
      case NotificacaoTipo.MOVIMENTO:
        return 'chatbubble';
      case NotificacaoTipo.ROUBO:
        return 'person-add';
      case NotificacaoTipo.TRANSACAO_CONCLUIDA:
        return 'cash';
      case NotificacaoTipo.AREA_PERIGOSA:
        return 'police';
      default:
        return 'notifications';
    }
  }

  onAcaoNotificacao(
    acao: TransacaoAcao | AmizadeAcao,
    notificacao: Notificacao,
  ) {
    if (!notificacao.acaoId || !notificacao.id) return;

    const transacaoId = notificacao.acaoId;
    const notificacaoId = notificacao.id;

    if (notificacao.tipo.includes('TRANSACAO')) {
      this.transacaoService
        .atualizarTransacao(transacaoId, acao as TransacaoAcao)
        .pipe(
          tap((res) => {
            console.log('RES COMPLETO:', res);
            this.mensagemService.enviarMensagem(res);
          }),

          switchMap(() => {
            return this.notificacaoService.marcarComoLida(notificacaoId);
          }),

          tap(() => {
            this.notificacaoService.notificacoes.update((notificaoes) =>
              notificaoes.filter(
                (notificacao) => notificacao.id != this.notificacao.id,
              ),
            );
          }),
        )
        .subscribe({
          error: (err: FlashMessageError) => {
            console.log(err);
            this.mensagemService.enviarMensagem(err.error);
          },
        });
    } else if (notificacao.tipo === NotificacaoTipo.AMIZADE) {
      this.amizadeService
        .atualizarAmizade(notificacao.acaoId, acao as AmizadeAcao)
        .pipe(
          tap((res) => {
            this.mensagemService.enviarMensagem(res);
          }),

          switchMap(() => {
            return this.notificacaoService.marcarComoLida(notificacaoId);
          }),

          tap(() => {
            this.notificacaoService.notificacoes.update((notificaoes) =>
              notificaoes.filter(
                (notificacao) => notificacao.id != this.notificacao.id,
              ),
            );
          }),
        )
        .subscribe({
          next: (res) => {
            this.notificacaoService.marcarComoLida(notificacao.id).subscribe();
          },
          error: (err: FlashMessageError) => {
            this.mensagemService.enviarMensagem(err.error);
          },
        });
    }
  }
}

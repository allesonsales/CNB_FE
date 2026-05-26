import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificacaoComponent } from '../../components/notificacao/notificacao.component';
import { NotificacaoService } from 'src/app/services/notificacao-service';
import { NotificacaoTipo } from 'src/app/models/NotificacaoTipo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NotificacaoComponent, FormsModule],
})
export class NotificacoesPage {
  tipoNotificacao = NotificacaoTipo;
  constructor(private notificacaoService: NotificacaoService) {}

  notificacoes = this.notificacaoService.notificacoes;

  notificacoesAmizades = computed(() => {
    return this.notificacoes().filter(
      (notificacao) => notificacao.tipo == this.tipoNotificacao.AMIZADE,
    );
  });

  notificacoesTransacao = computed(() => {
    return this.notificacoes().filter((notificacao) =>
      notificacao.tipo.includes('TRANSACAO'),
    );
  });

  notificacoesSocial = computed(() => {
    return this.notificacoes().filter(
      (notificacao) =>
        notificacao.tipo == this.tipoNotificacao.SOCIAL ||
        notificacao.tipo == this.tipoNotificacao.ROUBO,
    );
  });

  onAccordionChange(event: any) {
    if (event.detail.value === 'amizade') {
      this.marcarNotificacoesAmizadesLidas();
    } else if (event.detail.value === 'transacao') {
      this.marcarNotificacoesTransacoesLidas();
    }
  }

  marcarNotificacoesAmizadesLidas() {
    const notificacoesSemAcao = this.notificacoesAmizades()
      .filter((notificacao) => notificacao.acaoId == null)
      .map((notificacao) => notificacao.id);

    this.notificacaoService
      .marcarTodasComoLidas(notificacoesSemAcao)
      .subscribe();
  }

  marcarNotificacoesTransacoesLidas() {
    const notificacoesSemAcao = this.notificacoesTransacao()
      .filter((notificacao) => notificacao.acaoId == null)
      .map((notificacao) => notificacao.id);

    this.notificacaoService
      .marcarTodasComoLidas(notificacoesSemAcao)
      .subscribe();
  }

  ionViewWillEnter() {}
}

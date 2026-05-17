import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { map, Subscription } from 'rxjs';
import { NotificacaoService } from 'src/app/services/notificacao-service';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
})
export class TabBarComponent {
  ativo: string = 'home';
  constructor(private notificacaoesService: NotificacaoService) {}

  notificacoes = this.notificacaoesService.notificacoes;

  quantidadeNotificacoes = computed(() => this.notificacoes().length);
}

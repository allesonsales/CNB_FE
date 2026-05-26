import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { FlashMessageComponent } from './shared/components/flash-message/flash-message.component';
import { AuthService } from './services/auth-service';
import { MensagemService } from './services/mensagem-service';
import { Router } from '@angular/router';
import { FlashMessage } from './models/Response';
import { UsuarioLogado } from './models/usuario/usuario-logado';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    FlashMessageComponent,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonContent,
    IonMenuToggle,
    IonIcon,
  ],
  styleUrl: 'app.component.scss',
})
export class AppComponent {
  usuarioLogado: UsuarioLogado | null = null;

  constructor(
    private authService: AuthService,
    private mensagemService: MensagemService,
    private router: Router,
  ) {
    this.authService.restaurarSessao().subscribe();
  }

  irPara(rota: string) {
    if (rota == 'consulta-publica') {
      window.open('/consulta-publica', '_blank');
      return;
    }

    this.router.navigate([`/${rota}`]);
  }

  irParaConquista() {
    this.router.navigate([`/user/${this.authService.usuarioLogado()?.id}`], {
      queryParams: {
        aba: 'conquistas',
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res: FlashMessage) => {
        this.mensagemService.enviarMensagem(res);
        this.router.navigate(['/login']);
      },
    });
  }
}

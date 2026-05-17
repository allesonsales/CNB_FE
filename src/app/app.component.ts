import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { FlashMessageComponent } from './shared/components/flash-message/flash-message.component';
import { AuthService } from './services/auth-service';
import { MensagemService } from './services/mensagem-service';
import { Router } from '@angular/router';
import { FlashMessage } from './models/Response';

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
    IonTitle,
    IonContent,
    IonMenuToggle,
    IonIcon,
  ],
  styleUrl: 'app.component.scss',
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private mensagemService: MensagemService,
    private router: Router,
  ) {
    const rotaPublica = this.router.url.includes('/bicicleta/publica');

    if (!rotaPublica) {
      authService.getUsuario().subscribe({
        next: (res) => {
          authService.usuarioLogado.set(res);
        },
        error: () => {
          authService.usuarioLogado.set(null);
        },
      });
    }
  }

  irPara(rota: string) {
    this.router.navigate([`/${rota}`]);
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

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Amizade } from 'src/app/models/amizade/amizade';
import { AmizadeResponse } from 'src/app/models/amizade/amizade-res';
import { Perfil } from 'src/app/models/perfil/perfil';
import { FlashMessageError } from 'src/app/models/Response';
import { UsuarioResumido } from 'src/app/models/usuario/usuario-resumido';
import { AuthService } from 'src/app/services/auth-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { UsuarioService } from 'src/app/services/usuario-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-amizades-perfil',
  standalone: true,
  imports: [IonicModule, RouterLinkActive, RouterModule],
  templateUrl: './amizades-perfil.component.html',
  styleUrls: ['./amizades-perfil.component.scss'],
})
export class AmizadesPerfilComponent {
  public environment = environment;
  @Input() dadosPerfil: Perfil | null = null;
  amizades: AmizadeResponse[] = [];
  amigos: UsuarioResumido[] = [];
  constructor(
    private mensagemService: MensagemService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private authService: AuthService,
  ) {}

  ionViewWillEnter() {
    if (!this.dadosPerfil) return;
    environment.apiUrl;

    this.usuarioService.getAmizades(this.dadosPerfil.usuario.id).subscribe({
      next: (res: AmizadeResponse[]) => {
        this.amigos = [];
        res.map((amizade) => {
          const amigo =
            amizade.solicitado?.id === this.authService.usuarioLogado()?.id
              ? amizade?.solicitante
              : amizade.solicitado;

          if (amigo) {
            this.amigos.push(amigo);
          }
        });
      },
      error: (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  async irPara(usuarioId: number) {
    await this.modalCtrl.dismiss();
    this.router.navigate(['/user/' + usuarioId]);
  }

  async voltar() {
    await this.modalCtrl.dismiss();
  }
}

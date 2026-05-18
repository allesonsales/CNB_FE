import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { TabSocialComponent } from 'src/app/shared/components/tab-social/tab-social.component';
import { HeaderPerfilComponent } from '../../components/header-perfil/header-perfil.component';
import { UsuarioService } from 'src/app/services/usuario-service';
import { Usuario } from 'src/app/models/Usuario';
import { IonicModule } from '@ionic/angular';
import { FotosPerfilComponent } from '../../components/fotos-perfil/fotos-perfil.component';
import { GruposPerfilComponent } from '../../components/grupos-perfil/grupos-perfil.component';
import { ConquistasPerfilComponent } from '../../components/conquistas-perfil/conquistas-perfil.component';
import { AmizadeService } from 'src/app/services/amizade-service';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem-service';
import { FlashMessage } from 'src/app/models/Response';
import { UsuarioResumido } from 'src/app/models/usuario/usuario-resumido';
import { AmizadeStatusRes } from 'src/app/models/amizade/amizade-status';
import { Amizade } from 'src/app/models/amizade/amizade';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    TabSocialComponent,
    HeaderPerfilComponent,
    FotosPerfilComponent,
    GruposPerfilComponent,
    ConquistasPerfilComponent,
  ],
})
export class PerfilPage {
  usuario: UsuarioResumido | null = null;
  abaAtiva: string = 'fotos';
  usuarioId: number | null = null;
  amizade: Amizade | null = null;

  segmentos = [
    {
      icon: 'image-outline',
      content: 'fotos',
      acao: 'fotos',
    },
    {
      icon: 'people-outline',
      content: 'grupos',
      acao: 'grupos',
    },
    {
      icon: 'ribbon-outline',
      content: 'conquistas',
      acao: 'conquistas',
    },
  ];

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private amizadeService: AmizadeService,
    private activeRoute: ActivatedRoute,
    private mensagemService: MensagemService,
  ) {}

  ionViewWillEnter() {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.usuarioService.buscarPorId(id).subscribe({
      next: (res: UsuarioResumido) => {
        console.log(res);
        this.usuario = res;
      },
    });

    this.amizadeService.verificarAmizade(id).subscribe({
      next: (res: Amizade) => {
        console.log(res);
        this.amizade = res;
      },
    });
  }

  voltar() {
    this.navCtrl.back();
  }

  onAcao(acao: string) {
    this.abaAtiva = acao;
  }
}

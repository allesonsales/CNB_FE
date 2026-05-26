import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { TabSocialComponent } from 'src/app/shared/components/tab-social/tab-social.component';
import { HeaderPerfilComponent } from '../../components/header-perfil/header-perfil.component';
import { UsuarioService } from 'src/app/services/usuario-service';
import { Usuario } from 'src/app/models/Usuario';
import { IonicModule, ModalController } from '@ionic/angular';
import { FotosPerfilComponent } from '../../components/fotos-perfil/fotos-perfil.component';
import { GruposPerfilComponent } from '../../components/grupos-perfil/grupos-perfil.component';
import { ConquistasPerfilComponent } from '../../components/conquistas-perfil/conquistas-perfil.component';
import { AmizadeService } from 'src/app/services/amizade-service';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem-service';
import { UsuarioResumido } from 'src/app/models/usuario/usuario-resumido';
import { Amizade } from 'src/app/models/amizade/amizade';
import { AuthService } from 'src/app/services/auth-service';
import { UsuarioLogado } from 'src/app/models/usuario/usuario-logado';
import { PerfilService } from 'src/app/services/perfil-service';
import { Perfil } from 'src/app/models/perfil/perfil';
import { AmizadeStatusRes } from 'src/app/models/amizade/amizade-status';
import { ModalEditarPerfilComponent } from '../../modals/modal-editar-perfil/modal-editar-perfil.component';
import { AmizadesPerfilComponent } from '../../components/amizades-perfil/amizades-perfil.component';

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
  perfil: Perfil | null = null;
  statusAmizade = AmizadeStatusRes;

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
    private activeRoute: ActivatedRoute,
    private perfilService: PerfilService,
    private mensagemService: MensagemService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
  ) {}

  ionViewWillEnter() {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    const aba = this.activeRoute.snapshot.queryParamMap.get('aba');

    if (!aba) {
      this.abaAtiva = 'fotos';
    } else {
      this.abaAtiva = aba;
    }

    this.perfilService.preencherPerfil(id).subscribe({
      next: (res: Perfil) => {
        this.usuario = res.usuario ?? null;
        this.perfil = res;
      },
    });
  }

  async editarPerfil() {
    const modal = await this.modalCtrl.create({
      component: ModalEditarPerfilComponent,
      componentProps: { usuario: this.usuario },
    });

    await modal.present();
  }

  voltar() {
    this.navCtrl.back();
  }

  onAcao(acao: string) {
    this.abaAtiva = acao;
  }
}

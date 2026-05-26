import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Amizade } from 'src/app/models/amizade/amizade';
import { AmizadeStatusRes } from 'src/app/models/amizade/amizade-status';
import { UsuarioResumido } from 'src/app/models/usuario/usuario-resumido';
import { AuthService } from 'src/app/services/auth-service';
import { ModalEditarPerfilComponent } from '../../modals/modal-editar-perfil/modal-editar-perfil.component';

@Component({
  selector: 'app-acoes-perfil',
  templateUrl: './acoes-perfil.component.html',
  standalone: true,
  imports: [IonicModule],
  styleUrls: ['./acoes-perfil.component.scss'],
})
export class AcoesPerfilComponent {
  @Input() usuario: UsuarioResumido | null = null;
  @Input() amizadeStatus: AmizadeStatusRes | null = null;
  @Input() isMeuPerfil: boolean = false;

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private popOverCtrl: PopoverController,
  ) {}

  ngOnInit() {}

  async editarPerfil() {
    const modal = await this.modalCtrl.create({
      component: ModalEditarPerfilComponent,
      componentProps: { usuario: this.usuario },
    });

    await modal.present();
    await this.popOverCtrl.dismiss();
  }
}

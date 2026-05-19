import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Amizade } from 'src/app/models/amizade/amizade';
import { AmizadeStatusRes } from 'src/app/models/amizade/amizade-status';
import { UsuarioResumido } from 'src/app/models/usuario/usuario-resumido';
import { AuthService } from 'src/app/services/auth-service';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {}
}

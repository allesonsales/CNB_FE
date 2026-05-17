import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ListaBicicletaComponent } from '../../components/lista-bicicleta/lista-bicicleta.component';
import { IonicModule, IonItemDivider } from '@ionic/angular';
import { PostComponent } from 'src/app/features/social/components/post/post.component';
import { BotaoAdicionarComponent } from 'src/app/features/social/components/botao-adicionar/botao-adicionar.component';
import { NotificacaoService } from 'src/app/services/notificacao-service';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { BicicletaLista } from 'src/app/models/bicicleta/Bicicleta';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    ListaBicicletaComponent,
    IonicModule,
    PostComponent,
    BotaoAdicionarComponent,
  ],
})
export class HomePage implements OnInit {
  bicicletas: BicicletaLista[] = [];
  constructor(
    private notificacaoService: NotificacaoService,
    private bicicletaService: BicicletaService,
  ) {}

  ngOnInit() {
    this.bicicletaService.buscarBicicletas().subscribe({
      next: (res: BicicletaLista[]) => {
        this.bicicletaService.bicicletas.set(res);
        this.bicicletas = res;
      },
    });
  }
}

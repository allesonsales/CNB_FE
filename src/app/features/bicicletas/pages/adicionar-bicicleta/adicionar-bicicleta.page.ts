import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { UsuarioLogado } from 'src/app/models/usuario/usuario-logado';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { AuthService } from 'src/app/services/auth-service';
import { BicicletaCorLabel } from 'src/app/models/bicicleta/labels/bicicleta-cor';
import { bicicletaCategoraiLabel } from 'src/app/models/bicicleta/labels/bicicleta-categoria';
import { BicicletaMarca } from 'src/app/models/bicicleta/BicicletaMarca';
import { BicicletaCategoria } from 'src/app/models/bicicleta/BicicletaCategoria';
import { BicicletaCor } from 'src/app/models/bicicleta/BicicletaCor';
import { arosBicicleta } from 'src/app/models/bicicleta/bicicleta-aro';
import { BicicletaMarcaLabel } from 'src/app/models/bicicleta/labels/bicicleta-marca';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicModule, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-bicicleta',
  templateUrl: './adicionar-bicicleta.page.html',
  styleUrls: ['./adicionar-bicicleta.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
  ],
})
export class AdicionarBicicletaPage {
  formBicicleta: FormGroup;
  marcasBicicleta = Object.values(BicicletaMarca);
  categoriasBicicleta = Object.values(BicicletaCategoria);
  coresBicicleta = Object.values(BicicletaCor);
  arosBicicleta = arosBicicleta;
  usuarioId: Number | null = null;

  labelsCategoria = bicicletaCategoraiLabel;
  labelsCor = BicicletaCorLabel;
  labelsMarca = BicicletaMarcaLabel;

  get marca() {
    return this.formBicicleta.get('marca');
  }

  get aro() {
    return this.formBicicleta.get('aro');
  }

  get numeroSerie() {
    return this.formBicicleta.get('numeroSerie');
  }

  get cor() {
    return this.formBicicleta.get('cor');
  }
  get categoria() {
    return this.formBicicleta.get('categoria');
  }

  constructor(
    private fb: FormBuilder,
    private bicicletaService: BicicletaService,
    private mensagemService: MensagemService,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {
    this.formBicicleta = fb.group({
      marca: ['', Validators.required],
      aro: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      cor: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  async adicionarBicicleta() {
    if (this.formBicicleta.invalid) {
      this.formBicicleta.markAllAsTouched();
      this.mensagemService.enviarMensagem({
        status: 'error',
        mensagem: 'Verifique o formulário',
      });
    }

    const loading = await this.loadingCtrl.create({
      animated: true,
      message: 'Cadastrando bicicleta...',
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.bicicletaService
      .adicionarBicicleta(this.formBicicleta.value)
      .subscribe({
        next: async (res: FlashMessage) => {
          await loading.dismiss();
          this.mensagemService.enviarMensagem(res);
          this.router.navigate(['/bicicletas']);
        },
        error: async (err: FlashMessageError) => {
          await loading.dismiss();
          this.mensagemService.enviarMensagem(err.error);
        },
      });
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import { finalize } from 'rxjs';
import { BicicletaLista } from 'src/app/models/bicicleta/Bicicleta';
import { arosBicicleta } from 'src/app/models/bicicleta/bicicleta-aro';
import { BicicletaCategoria } from 'src/app/models/bicicleta/BicicletaCategoria';
import { BicicletaCor } from 'src/app/models/bicicleta/BicicletaCor';
import { BicicletaMarca } from 'src/app/models/bicicleta/BicicletaMarca';
import { bicicletaCategoraiLabel } from 'src/app/models/bicicleta/labels/bicicleta-categoria';
import { BicicletaCorLabel } from 'src/app/models/bicicleta/labels/bicicleta-cor';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { MensagemService } from 'src/app/services/mensagem-service';

@Component({
  selector: 'app-modal-editar-bicicleta',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-editar-bicicleta.component.html',
  styleUrls: ['./modal-editar-bicicleta.component.scss'],
})
export class ModalEditarBicicletaComponent {
  @Input() bicicleta!: BicicletaLista;

  formBicicleta: FormGroup;
  marcasBicicleta = Object.values(BicicletaMarca);

  coresBicicleta = Object.values(BicicletaCor);
  labelsCor = BicicletaCorLabel;

  categoriasBicicleta = Object.values(BicicletaCategoria);
  labelsCategoria = bicicletaCategoraiLabel;

  arosBicicleta = arosBicicleta;

  get aro() {
    return this.formBicicleta.get('aro');
  }

  get cor() {
    return this.formBicicleta.get('cor');
  }

  get categoria() {
    return this.formBicicleta.get('categoria');
  }

  get marca() {
    return this.formBicicleta.get('marca');
  }

  get numeroSerie() {
    return this.formBicicleta.get('numeroSerie');
  }

  constructor(
    private bicicletaService: BicicletaService,
    private mensagemService: MensagemService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
  ) {
    this.formBicicleta = fb.group({
      marca: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      aro: ['', Validators.required],
      cor: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.formBicicleta.patchValue({
      numeroSerie: this.bicicleta?.numeroSerie,
      marca: this.bicicleta?.marca,
      aro: this.bicicleta?.aro,
      cor: this.bicicleta?.cor,
      categoria: this.bicicleta?.categoria,
    });
  }

  async confirmarEdicao() {
    if (!this.bicicleta) return;
    const loading = await this.loadingCtrl.create({
      animated: true,
      message: 'Atualizando bicicleta...',
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    await loading.present();

    const bicicletaAtualizada: BicicletaLista = {
      id: this.bicicleta.id,
      aro: this.aro?.value,
      categoria: this.categoria?.value,
      cor: this.cor?.value,
      numeroSerie: this.numeroSerie?.value,
      marca: this.marca?.value,
    };

    this.bicicletaService
      .editarBicicleta(this.bicicleta.id, bicicletaAtualizada)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe({
        next: async (res: FlashMessage) => {
          this.formBicicleta.reset();

          await this.modalCtrl.dismiss(bicicletaAtualizada);

          this.mensagemService.enviarMensagem(res);
        },
        error: async (err: FlashMessageError) => {
          this.mensagemService.enviarMensagem(err.error);
        },
      });
  }

  cancelar() {
    this.formBicicleta.reset();
    this.modalCtrl.dismiss();
  }
}

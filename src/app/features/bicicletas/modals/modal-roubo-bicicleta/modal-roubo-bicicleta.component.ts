import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';
import { Endereco } from 'src/app/models/endereco/endereco';
import { Estados } from 'src/app/models/estados/estados';
import { estadosLabels } from 'src/app/models/estados/labels/estados-labels';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { rouboTipoLabel } from 'src/app/models/roubo/labels/roubo-tipo';
import { RouboRequest } from 'src/app/models/roubo/roubo-request';

import { RouboTipo } from 'src/app/models/roubo/roubo-tipo';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { EnderecoService } from 'src/app/services/endereco-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { RouboService } from 'src/app/services/roubo-service';

@Component({
  selector: 'app-modal-roubo-bicicleta',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modal-roubo-bicicleta.component.html',
  styleUrls: ['./modal-roubo-bicicleta.component.scss'],
})
export class ModalRouboBicicletaComponent {
  @Input() bicicletaId!: number;
  roubo: RouboRequest | null = null;
  abrirModalRoubo: boolean = false;
  formRoubo!: FormGroup;
  tipoRoubo = Object.values(RouboTipo);
  estados = Object.values(Estados);
  bicicleta: Bicicleta | null = null;

  labelTipoRoubo = rouboTipoLabel;
  labelEstados = estadosLabels;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private bicicletaService: BicicletaService,
    private enderecoService: EnderecoService,
    private rouboService: RouboService,
    private mensagemService: MensagemService,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    this.formRoubo = fb.group({
      cep: [null, [Validators.required, Validators.maxLength(9)]],
      logradouro: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      localidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      latitude: [null],
      longitude: [null],
      dataRoubo: [null, [Validators.required]],
      tipoRouboInput: [null, [Validators.required]],
    });
  }

  get cep() {
    return this.formRoubo.get('cep');
  }

  get logradouro() {
    return this.formRoubo.get('logradouro');
  }

  get bairro() {
    return this.formRoubo.get('bairro');
  }

  get localidade() {
    return this.formRoubo.get('localidade');
  }

  get estado() {
    return this.formRoubo.get('estado');
  }

  get dataRoubo() {
    return this.formRoubo.get('dataRoubo');
  }
  get tipoRouboInput() {
    return this.formRoubo.get('tipoRouboInput');
  }

  ionViewWillEnter() {
    this.bicicletaService.buscarBicicletaId(this.bicicletaId).subscribe({
      next: (bicicleta: Bicicleta) => {
        this.bicicleta = bicicleta;
      },
      error: (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
        return;
      },
    });
  }

  async buscarCep() {
    const cep = this.formRoubo.get('cep')?.value;

    if (cep == null) {
      return;
    }

    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'bubbles',
      message: 'Buscando endereço...',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.enderecoService.buscarCep(cep).subscribe({
      next: async (res: Endereco) => {
        await loading.dismiss();

        this.formRoubo.patchValue({
          logradouro: res.logradouro,
          bairro: res.bairro,
          localidade: res.localidade,
          estado: res.estado,
        });

        console.log(res);
      },
    });
  }

  async confirmar() {
    const dataAtual = new Date();
    const dataSelecionada = new Date(this.dataRoubo?.value);

    const loading = await this.loadingCtrl.create({
      animated: true,
      message: 'Informando roubo..',
      spinner: 'bubbles',
    });

    await loading.present();

    if (dataSelecionada > dataAtual) {
      this.dataRoubo?.setErrors({
        dataFutura: true,
      });
      await loading.dismiss();
      return;
    }

    if (this.formRoubo.invalid) {
      this.formRoubo.markAllAsTouched();
      await loading.dismiss();

      return;
    }

    if (this.bicicleta == null) {
      await loading.dismiss();

      return;
    }

    this.roubo = new RouboRequest();

    this.roubo.bicicleta = this.bicicleta;
    this.roubo.tipoRoubo = this.tipoRouboInput?.value;
    this.roubo.dataRoubo = this.dataRoubo?.value;
    this.roubo.endereco = this.formRoubo.value;

    this.rouboService.cadastrarRoubo(this.roubo).subscribe({
      next: async (res: FlashMessage) => {
        this.mensagemService.enviarMensagem(res);
        this.formRoubo.reset();
        await loading.dismiss();
        await this.modalCtrl.dismiss(this.bicicleta);
      },
      error: async (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
        await loading.dismiss();
      },
    });
  }

  cancelar() {
    this.modalCtrl.dismiss();
    this.formRoubo.reset();
  }
}

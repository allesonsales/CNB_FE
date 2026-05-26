import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import { Bicicleta } from 'src/app/models/bicicleta/Bicicleta';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { Transacao } from 'src/app/models/transacao/transacao';
import { TransacaoRequest } from 'src/app/models/transacao/transacao-request';
import { UsuarioResumido } from 'src/app/models/usuario/usuario-resumido';
import { BicicletaService } from 'src/app/services/bicicleta-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { TransacaoService } from 'src/app/services/transacao-service';
import { UsuarioService } from 'src/app/services/usuario-service';
import { CpfMaskDirective } from 'src/app/directives/cpf-mask-directive';

@Component({
  selector: 'app-modal-iniciar-transferencia',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, CpfMaskDirective],
  templateUrl: './modal-iniciar-transferencia.component.html',
  styleUrls: ['./modal-iniciar-transferencia.component.scss'],
})
export class ModalIniciarTransferenciaComponent {
  @Input() bicicletaId!: number;
  bicicleta: Bicicleta | null = null;
  comprador: UsuarioResumido | null = null;
  transacao: Transacao | null = null;
  formTransacao: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bicicletaService: BicicletaService,
    private usuarioService: UsuarioService,
    private transacaoService: TransacaoService,
    private mensagemService: MensagemService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) {
    this.formTransacao = fb.group({
      cpf: [null, [Validators.required]],
      nome: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      cor: ['', [Validators.required]],
      aro: ['', [Validators.required]],
      numeroSerie: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
  }

  ionViewWillEnter() {
    this.bicicletaService.buscarBicicletaId(this.bicicletaId).subscribe({
      next: (bicicleta: Bicicleta) => {
        this.bicicleta = bicicleta;
        this.formTransacao.patchValue({
          marca: bicicleta.marca,
          cor: bicicleta.cor,
          aro: bicicleta.aro,
          numeroSerie: bicicleta.numeroSerie,
        });
      },
      error: (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
        return;
      },
    });

    const cpfController = this.formTransacao.get('cpf');

    cpfController?.valueChanges.subscribe((cpf) => {
      if (!cpf) return;

      const cpfLimpo = cpf.replace(/\D/g, '');

      if (cpfLimpo.length !== 11) {
        this.comprador = null;
        this.formTransacao.get('nome')?.setValue('');
        return;
      }

      this.buscarUsuarioPorCpf();
    });
  }

  async buscarUsuarioPorCpf() {
    const cpf = this.formTransacao.get('cpf')?.value;

    const cpfLimpo = cpf.replace(/\D/g, '');

    const loading = await this.loadingCtrl.create({
      animated: true,
      message: `Buscando usuário...`,
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.usuarioService.buscarPorCpf(cpfLimpo).subscribe({
      next: async (usuario: UsuarioResumido) => {
        this.comprador = usuario;
        await loading.dismiss();
        this.formTransacao.controls['nome'].setValue(usuario.nome);
      },
      error: async (err: FlashMessageError) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  async transferir() {
    if (!this.bicicleta) return;
    if (!this.comprador) return;

    const valor = this.formTransacao.controls['valor'].value;

    if (valor == 0) {
      this.mensagemService.enviarMensagem({
        status: 'error',
        mensagem: 'O valor precisa ser maior que 0.',
      });
      return;
    }

    const transacao: TransacaoRequest = {
      bicicleta: this.bicicleta,
      comprador: this.comprador,
      valor: valor,
    };

    const loading = await this.loadingCtrl.create({
      animated: true,
      message: `Realizando transferência...`,
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.transacaoService.criarTransacao(transacao).subscribe({
      next: async (res: FlashMessage) => {
        this.mensagemService.enviarMensagem(res);
        await loading.dismiss();
        await this.modalCtrl.dismiss();
      },
      error: async (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
        await loading.dismiss();
        await this.modalCtrl.dismiss();
      },
    });
  }

  cancelar() {
    this.formTransacao.reset();
    this.modalCtrl.dismiss();
    this.comprador = null;
    this.bicicleta = null;
  }
}

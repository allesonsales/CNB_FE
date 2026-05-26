import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario';
import { CpfMaskDirective } from 'src/app/directives/cpf-mask-directive';
import { TelMaskDirective } from 'src/app/directives/tel-mask-directive';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/app/services/usuario-service';
import { tap } from 'rxjs';
import { UsuarioEdicao } from 'src/app/models/usuario/usuario-edicao';
import { MensagemService } from 'src/app/services/mensagem-service';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { LoadingController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AlterarSenha } from 'src/app/models/usuario/alterar-senha';

@Component({
  selector: 'app-modal-editar-perfil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CpfMaskDirective,
    TelMaskDirective,
  ],
  templateUrl: './modal-editar-perfil.component.html',
  styleUrls: ['./modal-editar-perfil.component.scss'],
})
export class ModalEditarPerfilComponent implements OnInit {
  usuario: UsuarioEdicao | null = null;
  formUsuario: FormGroup;
  formSenha: FormGroup;
  carregando: boolean = false;

  alterarSenha: boolean = false;
  senha: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    private mensagemService: MensagemService,
  ) {
    this.formUsuario = fb.group({
      nome: ['', [Validators.required, this.validarNome]],
      cpf: ['', Validators.required],
      dataNascimento: ['', [Validators.required, this.validarNascimento]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
    });

    this.formSenha = fb.group({
      senhaAtual: ['', [Validators.required, Validators.minLength(6)]],
      senhaNova: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenhaNova: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get fotoUrl() {
    return `${environment.apiUrl}${this.usuario?.foto}`;
  }

  get nomeInput() {
    return this.formUsuario.get('nome');
  }

  get emailInput() {
    return this.formUsuario.get('email');
  }

  get telefoneInput() {
    return this.formUsuario.get('telefone');
  }

  get dataNascimentoInput() {
    return this.formUsuario.get('dataNascimento');
  }

  get senhaAtual() {
    return this.formSenha.get('senhaAtual');
  }

  get senhaNova() {
    return this.formSenha.get('senhaNova');
  }

  get confirmarSenhaNova() {
    return this.formSenha.get('confirmarSenhaNova');
  }

  ngOnInit() {
    this.usuarioService
      .buscarParaEdicao()
      .pipe(tap(() => (this.carregando = false)))
      .subscribe({
        next: (res: UsuarioEdicao) => {
          this.usuario = res;

          this.formUsuario.patchValue(res);
        },
        error: (err: FlashMessageError) => {
          this.mensagemService.enviarMensagem(err.error);
        },
      });
  }

  validarNome(control: FormControl) {
    const nome = control.value;

    if (!nome) return null;

    if (nome.trim().split(' ').length < 2) {
      return {
        nomeInvalido: true,
      };
    }

    return null;
  }

  validarNascimento(control: FormControl) {
    const nascimento = control.value;

    if (!nascimento) return null;

    const hoje = new Date();

    const dataNascimento = new Date(nascimento);
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    const mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }

    if (idade < 18) {
      return { menorDeIdade: true };
    }
    if (idade > 99) {
      return { idadeInvalida: true };
    }

    return null;
  }

  verSenha(senha: string) {
    if (this.senha == senha) {
      this.senha = '';
    } else {
      this.senha = senha;
    }
  }

  cancelar() {
    this.formSenha.reset();
    this.modalCtrl.dismiss();
  }

  cancelarAlterarSenha() {
    this.alterarSenha = false;
    this.formSenha.reset();
  }

  async confirmarEdicao() {
    if (!this.usuario) return;

    const loading = await this.loadingCtrl.create({
      animated: true,
      message: 'Atualizando perfil...',
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.formUsuario.markAllAsTouched();

    if (this.formUsuario.invalid) {
      await loading.dismiss();
      this.mensagemService.enviarMensagem({
        mensagem: 'Verifique o formúlário.',
        status: 'error',
      });
      return;
    }

    const novoUsuario: UsuarioEdicao = {
      nome: this.formUsuario.get('nome')?.value,
      dataNascimento: this.formUsuario.get('dataNascimento')?.value,
      email: this.formUsuario.get('email')?.value,
      cpf: this.formUsuario?.get('cpf')?.value,
      telefone: this.formUsuario.get('telefone')?.value,
    };

    this.usuarioService
      .confirmarEdicao(novoUsuario)
      .pipe(tap(async () => await loading.dismiss()))
      .subscribe({
        next: async (res: FlashMessage) => {
          await this.modalCtrl.dismiss();
          this.router.navigate(['/home']);
          this.mensagemService.enviarMensagem(res);
        },
        error: (err) => {},
      });
  }

  async confirmarAlterarSenha() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      cssClass: 'custom-loading',
      message: 'Alterando senha...',
    });

    await loading.present();

    this.formSenha.markAllAsTouched();

    if (this.formSenha.invalid) {
      await loading.dismiss();

      this.mensagemService.enviarMensagem({
        mensagem: 'Verifique o formulário de edição de senha.',
        status: 'error',
      });
      return;
    }

    if (
      this.formSenha.get('senhaNova')?.value !=
      this.formSenha.get('confirmarSenhaNova')?.value
    ) {
      await loading.dismiss();

      this.mensagemService.enviarMensagem({
        mensagem: 'A senha e a confirmação estão diferentes.',
        status: 'error',
      });
      return;
    }

    const dtoSenha: AlterarSenha = {
      senhaNova: this.formSenha.get('senhaNova')?.value,
      senhaAtual: this.formSenha.get('senhaAtual')?.value,
    };

    this.usuarioService.alterarSenha(dtoSenha).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem(res);
        this.modalCtrl.dismiss();
        this.alterarSenha = false;
        this.router.navigate(['/home']);
      },
      error: async (err) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }
}

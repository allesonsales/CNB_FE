import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { UsuarioCadastrar } from 'src/app/models/Usuario';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { AuthService } from 'src/app/services/auth-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { CpfMaskDirective } from 'src/app/directives/cpf-mask-directive';
import { TelMaskDirective } from 'src/app/directives/tel-mask-directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastre-se',
  templateUrl: './cadastre-se.page.html',
  styleUrls: ['./cadastre-se.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BackgroundComponent,
    CpfMaskDirective,
    TelMaskDirective,
  ],
})
export class CadastreSePage {
  formCadastro!: FormGroup;
  verSenha: boolean = false;
  verConfirmarSenha: boolean = false;

  get email() {
    return this.formCadastro.get('email');
  }

  get nome() {
    return this.formCadastro.get('nome');
  }

  get cpf() {
    return this.formCadastro.get('cpf');
  }

  get dataNascimento() {
    return this.formCadastro.get('dataNascimento');
  }

  get telefone() {
    return this.formCadastro.get('telefone');
  }

  get senha() {
    return this.formCadastro.get('senha');
  }

  get confirmarSenha() {
    return this.formCadastro.get('confirmarSenha');
  }

  constructor(
    private fB: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private mensagemService: MensagemService,
    private router: Router,
  ) {
    this.formCadastro = fB.group(
      {
        nome: ['', [Validators.required, this.validarNome]],
        cpf: ['', [Validators.required, Validators.minLength(11)]],
        dataNascimento: ['', [Validators.required, this.validarNascimento]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required, Validators.minLength(11)]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.validarSenhas,
      },
    );
  }

  voltar() {
    this.formCadastro.reset();
    this.navCtrl.back();
  }

  validarSenhas(grupo: FormGroup) {
    const senha = grupo.get('senha')?.value;
    const confirmarSenha = grupo.get('confirmarSenha')?.value;

    if (senha != confirmarSenha) {
      return { senhasDiferentes: true };
    }

    return null;
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

  cadastrar() {
    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();

      this.mensagemService.enviarMensagem({
        status: 'error',
        mensagem: 'Existem campos inválidos.',
      });

      return;
    }
    const cpf = this.formCadastro.get('cpf')?.value;
    const cpfLimpo = cpf.replace(/\D/g, '');

    const novoUsuario: UsuarioCadastrar = {
      ...this.formCadastro.value,
      cpf: cpfLimpo,
    };

    this.authService.cadastrar(novoUsuario).subscribe({
      next: (res: FlashMessage) => {
        this.mensagemService.enviarMensagem(res);
        this.formCadastro.reset();
        this.router.navigate(['/login']);
      },
      error: (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { AuthService } from 'src/app/services/auth-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FlashMessageError } from 'src/app/models/Response';
import { getUsuarioLogado } from '../../utils/getUsuarioLogado';
import { FormLogin } from '../../models/FormLogin';
import { NotificacaoService } from 'src/app/services/notificacao-service';
import { Subscription, switchMap, timer } from 'rxjs';
import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BackgroundComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage implements OnInit {
  login!: FormGroup;
  verSenha: boolean = false;
  private notificacaoSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private mensagemService: MensagemService,
    private notificacaoService: NotificacaoService,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {
    this.login = fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async logar() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'bubbles',
      message: 'Acessando CNB...',
      cssClass: 'custom-loading',
    });

    await loading.present();

    const formLogin: FormLogin = {
      email: this.login.controls['email'].value,
      senha: this.login.controls['senha'].value,
    };

    if (formLogin.email == '') {
      ((formLogin.email = 'user56@gmail.com'), (formLogin.senha = 'ABCDEF'));
    }

    this.authService.login(formLogin).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem(res);

        if (res) {
          this.notificacaoSub = this.notificacaoService
            .startPolling()
            .subscribe((res) => this.notificacaoService.notificacoes.set(res));

          getUsuarioLogado.id = res.usuario.id;
          getUsuarioLogado.nome = res.usuario.nome;
          this.router.navigate(['home']);
        }
      },
      error: async (err: FlashMessageError) => {
        await loading.dismiss();
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }

  logarUsuarioOutro() {
    const formLogin: FormLogin = {
      email: 'user45@gmail.com',
      senha: 'ABCDEF',
    };

    this.authService.login(formLogin).subscribe({
      next: (res: any) => {
        this.mensagemService.enviarMensagem(res);
        console.log(res);

        if (res) {
          this.authService.isLogged = true;

          this.notificacaoSub = this.notificacaoService
            .startPolling()
            .subscribe((res) => this.notificacaoService.notificacoes.set(res));

          getUsuarioLogado.id = res.usuario.id;
          getUsuarioLogado.nome = res.usuario.nome;
          this.router.navigate(['home']);
        }
      },
      error: (err: FlashMessageError) => {
        this.mensagemService.enviarMensagem(err.error);
      },
    });
  }
}

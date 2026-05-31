import { Component, OnInit } from '@angular/core';
import {
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Camera, MediaTypeSelection } from '@capacitor/camera';
import { CloudinaryService } from 'src/app/services/cloudinary-service';
import { Grupo } from 'src/app/models/grupo/grupo';
import { GrupoService } from 'src/app/services/grupo-service';
import { MensagemService } from 'src/app/services/mensagem-service';
import { FlashMessage, FlashMessageError } from 'src/app/models/Response';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-criar-grupo',
  templateUrl: './criar-grupo.component.html',
  styleUrls: ['./criar-grupo.component.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class CriarGrupoComponent implements OnInit {
  get imagemPadrao() {
    return `${environment.apiUrl}/images/grupo.png`;
  }

  formGrupo: FormGroup;
  fotoSelecionada: string | null = null;

  constructor(
    private fb: FormBuilder,
    private grupoService: GrupoService,
    private mensagemService: MensagemService,
    private cloudNaryService: CloudinaryService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
  ) {
    this.formGrupo = fb.group({
      nome: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  async selecionarFoto() {
    const imagem = await Camera.chooseFromGallery({
      allowMultipleSelection: false,
      mediaType: MediaTypeSelection.Photo,
      limit: 1,
    });

    if (imagem.results[0] == null) return;
    console.log(imagem.results[0]);
    this.fotoSelecionada = String(imagem.results[0].webPath);
  }

  async cadastrar() {
    this.formGrupo.markAllAsTouched();

    const loading = await this.loadingCtrl.create({
      animated: true,
      message: 'Criando grupo...',
      cssClass: 'custom-loading',
    });

    await loading.present();

    if (this.formGrupo.invalid) {
      this.mensagemService.enviarMensagem({
        mensagem: 'Verifique o formulário e tente novamente.',
        status: 'error',
      });
      await loading.dismiss();
      return;
    }

    try {
      const novoGrupo: Grupo = {
        descricao: this.formGrupo.get('descricao')?.value,
        nome: this.formGrupo.get('nome')?.value,
      };

      if (this.fotoSelecionada) {
        const response = await fetch(this.fotoSelecionada);

        const blob = await response.blob();

        const formData = new FormData();
        formData.append('file', blob);
        formData.append('folder', 'cnb-grupos/capas');
        formData.append('upload_preset', 'cnb_upload');

        const resultado: any = await firstValueFrom(
          this.cloudNaryService.postCapaGrupo(formData),
        );

        novoGrupo.foto = resultado.secure_url;
      }

      this.grupoService.criarGrupo(novoGrupo).subscribe({
        next: async (res: FlashMessage) => {
          await loading.dismiss();
          this.mensagemService.enviarMensagem(res);
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      await loading.dismiss();
    }
  }

  async cancelar() {
    this.formGrupo.reset();
    await this.modalCtrl.dismiss();
  }
}

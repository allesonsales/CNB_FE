import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PopoverController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-botao-adicionar',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './botao-adicionar.component.html',
  styleUrls: ['./botao-adicionar.component.scss'],
})
export class BotaoAdicionarComponent {
  menuAberto: boolean = false;
  evento: any;
  constructor(
    private router: Router,
    private popOverCtrl: PopoverController,
  ) {}

  async irPara(pagina: string) {
    await this.popOverCtrl.dismiss();
    this.router.navigate([pagina]);
  }
}

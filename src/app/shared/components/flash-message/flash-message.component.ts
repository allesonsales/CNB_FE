import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { MensagemService } from 'src/app/services/mensagem-service';
import { FlashMessage } from '../../../models/Response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flash-message',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.scss'],
})
export class FlashMessageComponent implements OnInit, OnDestroy {
  private sub!: Subscription;

  mensagem!: string;
  status!: string;
  isOpen: boolean = false;

  constructor(private mensagemService: MensagemService) {}

  ngOnInit() {
    this.mensagemService.mensagem$.subscribe((res) => {
      this.mensagem = res.mensagem;
      this.status = res.status;
      this.isOpen = true;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

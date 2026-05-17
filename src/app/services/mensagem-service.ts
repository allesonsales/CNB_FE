import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FlashMessage } from '../models/Response';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  private mensagemSubject = new Subject<FlashMessage>();

  mensagem$ = this.mensagemSubject.asObservable();

  enviarMensagem(msg: FlashMessage) {
    this.mensagemSubject.next(msg);
  }
}

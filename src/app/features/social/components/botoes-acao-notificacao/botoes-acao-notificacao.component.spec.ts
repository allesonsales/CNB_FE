import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BotoesAcaoNotificacaoComponent } from './botoes-acao-notificacao.component';

describe('BotoesAcaoNotificacaoComponent', () => {
  let component: BotoesAcaoNotificacaoComponent;
  let fixture: ComponentFixture<BotoesAcaoNotificacaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BotoesAcaoNotificacaoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BotoesAcaoNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalIniciarTransferenciaComponent } from './modal-iniciar-transferencia.component';

describe('ModalIniciarTransferenciaComponent', () => {
  let component: ModalIniciarTransferenciaComponent;
  let fixture: ComponentFixture<ModalIniciarTransferenciaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIniciarTransferenciaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalIniciarTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

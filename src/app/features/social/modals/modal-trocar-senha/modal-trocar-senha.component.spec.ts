import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTrocarSenhaComponent } from './modal-trocar-senha.component';

describe('ModalTrocarSenhaComponent', () => {
  let component: ModalTrocarSenhaComponent;
  let fixture: ComponentFixture<ModalTrocarSenhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTrocarSenhaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTrocarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

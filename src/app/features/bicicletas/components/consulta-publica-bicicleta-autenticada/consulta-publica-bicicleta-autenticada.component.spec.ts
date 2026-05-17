import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultaPublicaBicicletaAutenticadaComponent } from './consulta-publica-bicicleta-autenticada.component';

describe('ConsultaPublicaBicicletaAutenticadaComponent', () => {
  let component: ConsultaPublicaBicicletaAutenticadaComponent;
  let fixture: ComponentFixture<ConsultaPublicaBicicletaAutenticadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPublicaBicicletaAutenticadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaPublicaBicicletaAutenticadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultaPublicaBicicletaRoubadaComponent } from './consulta-publica-bicicleta-roubada.component';

describe('ConsultaPublicaBicicletaRoubadaComponent', () => {
  let component: ConsultaPublicaBicicletaRoubadaComponent;
  let fixture: ComponentFixture<ConsultaPublicaBicicletaRoubadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPublicaBicicletaRoubadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaPublicaBicicletaRoubadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultaPublicaBicicletaNaoEncontradaComponent } from './consulta-publica-bicicleta-nao-encontrada.component';

describe('ConsultaPublicaBicicletaNaoEncontradaComponent', () => {
  let component: ConsultaPublicaBicicletaNaoEncontradaComponent;
  let fixture: ComponentFixture<ConsultaPublicaBicicletaNaoEncontradaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPublicaBicicletaNaoEncontradaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaPublicaBicicletaNaoEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

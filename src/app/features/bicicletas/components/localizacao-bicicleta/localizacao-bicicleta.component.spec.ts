import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalizacaoBicicletaComponent } from './localizacao-bicicleta.component';

describe('LocalizacaoBicicletaComponent', () => {
  let component: LocalizacaoBicicletaComponent;
  let fixture: ComponentFixture<LocalizacaoBicicletaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacaoBicicletaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizacaoBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

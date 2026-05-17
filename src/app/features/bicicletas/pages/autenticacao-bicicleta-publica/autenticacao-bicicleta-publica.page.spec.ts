import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutenticacaoBicicletaPublicaPage } from './autenticacao-bicicleta-publica.page';

describe('AutenticacaoBicicletaPublicaPage', () => {
  let component: AutenticacaoBicicletaPublicaPage;
  let fixture: ComponentFixture<AutenticacaoBicicletaPublicaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacaoBicicletaPublicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarBicicletaPage } from './adicionar-bicicleta.page';

describe('AdicionarBicicletaPage', () => {
  let component: AdicionarBicicletaPage;
  let fixture: ComponentFixture<AdicionarBicicletaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarBicicletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

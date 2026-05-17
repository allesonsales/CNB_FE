import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaPublicaPage } from './consulta-publica.page';

describe('ConsultaPublicaPage', () => {
  let component: ConsultaPublicaPage;
  let fixture: ComponentFixture<ConsultaPublicaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPublicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

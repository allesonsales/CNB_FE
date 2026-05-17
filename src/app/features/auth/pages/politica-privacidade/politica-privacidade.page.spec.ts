import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticaPrivacidadePage } from './politica-privacidade.page';

describe('PoliticaPrivacidadePage', () => {
  let component: PoliticaPrivacidadePage;
  let fixture: ComponentFixture<PoliticaPrivacidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaPrivacidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

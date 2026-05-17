import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaPublicaQrCodePage } from './consulta-publica-qr-code.page';

describe('ConsultaPublicaQrCodePage', () => {
  let component: ConsultaPublicaQrCodePage;
  let fixture: ComponentFixture<ConsultaPublicaQrCodePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPublicaQrCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

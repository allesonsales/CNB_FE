import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheBicicletaPage } from './detalhe-bicicleta.page';

describe('DetalheBicicletaPage', () => {
  let component: DetalheBicicletaPage;
  let fixture: ComponentFixture<DetalheBicicletaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheBicicletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

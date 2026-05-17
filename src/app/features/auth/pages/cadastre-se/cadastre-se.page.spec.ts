import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastreSePage } from './cadastre-se.page';

describe('CadastreSePage', () => {
  let component: CadastreSePage;
  let fixture: ComponentFixture<CadastreSePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastreSePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

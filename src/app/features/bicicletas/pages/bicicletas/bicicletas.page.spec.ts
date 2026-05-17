import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BicicletasPage } from './bicicletas.page';

describe('BicicletasPage', () => {
  let component: BicicletasPage;
  let fixture: ComponentFixture<BicicletasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BicicletasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

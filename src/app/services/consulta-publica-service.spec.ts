import { TestBed } from '@angular/core/testing';

import { ConsultaPublicaService } from './consulta-publica-service';

describe('ConsultaPublicaService', () => {
  let service: ConsultaPublicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaPublicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RouboService } from './roubo-service';

describe('RouboService', () => {
  let service: RouboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

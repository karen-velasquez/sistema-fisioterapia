import { TestBed } from '@angular/core/testing';

import { FisioterapeutaService } from './fisioterapeuta.service';

describe('FisioterapeutaService', () => {
  let service: FisioterapeutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FisioterapeutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

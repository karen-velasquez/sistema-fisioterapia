import { TestBed } from '@angular/core/testing';

import { LesionesService } from './lesiones.service';

describe('LesionesService', () => {
  let service: LesionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LesionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

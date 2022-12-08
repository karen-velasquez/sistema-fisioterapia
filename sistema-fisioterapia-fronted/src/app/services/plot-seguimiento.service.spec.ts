import { TestBed } from '@angular/core/testing';

import { PlotSeguimientoService } from './plot-seguimiento.service';

describe('PlotSeguimientoService', () => {
  let service: PlotSeguimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotSeguimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

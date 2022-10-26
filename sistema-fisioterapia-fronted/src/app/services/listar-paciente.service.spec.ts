import { TestBed } from '@angular/core/testing';

import { ListarPacienteService } from './listar-paciente.service';

describe('ListarPacienteService', () => {
  let service: ListarPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FlaskModuleService } from './flask-module.service';

describe('FlaskModuleService', () => {
  let service: FlaskModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlaskModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

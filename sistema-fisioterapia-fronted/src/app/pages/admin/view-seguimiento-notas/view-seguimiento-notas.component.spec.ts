import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSeguimientoNotasComponent } from './view-seguimiento-notas.component';

describe('ViewSeguimientoNotasComponent', () => {
  let component: ViewSeguimientoNotasComponent;
  let fixture: ComponentFixture<ViewSeguimientoNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSeguimientoNotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSeguimientoNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

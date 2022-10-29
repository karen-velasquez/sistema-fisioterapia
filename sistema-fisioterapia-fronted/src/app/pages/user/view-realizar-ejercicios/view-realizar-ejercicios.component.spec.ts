import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRealizarEjerciciosComponent } from './view-realizar-ejercicios.component';

describe('ViewRealizarEjerciciosComponent', () => {
  let component: ViewRealizarEjerciciosComponent;
  let fixture: ComponentFixture<ViewRealizarEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRealizarEjerciciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRealizarEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

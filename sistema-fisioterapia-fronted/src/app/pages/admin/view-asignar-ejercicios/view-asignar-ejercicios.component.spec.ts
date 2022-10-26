import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAsignarEjerciciosComponent } from './view-asignar-ejercicios.component';

describe('ViewAsignarEjerciciosComponent', () => {
  let component: ViewAsignarEjerciciosComponent;
  let fixture: ComponentFixture<ViewAsignarEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAsignarEjerciciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAsignarEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

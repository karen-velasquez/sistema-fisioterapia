import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEjerciciosAsignadosComponent } from './view-ejercicios-asignados.component';

describe('ViewEjerciciosAsignadosComponent', () => {
  let component: ViewEjerciciosAsignadosComponent;
  let fixture: ComponentFixture<ViewEjerciciosAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEjerciciosAsignadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEjerciciosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

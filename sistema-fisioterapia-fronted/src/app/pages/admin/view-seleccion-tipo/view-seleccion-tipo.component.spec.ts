import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSeleccionTipoComponent } from './view-seleccion-tipo.component';

describe('ViewSeleccionTipoComponent', () => {
  let component: ViewSeleccionTipoComponent;
  let fixture: ComponentFixture<ViewSeleccionTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSeleccionTipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSeleccionTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

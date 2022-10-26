import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSesionesComponent } from './view-sesiones.component';

describe('ViewSesionesComponent', () => {
  let component: ViewSesionesComponent;
  let fixture: ComponentFixture<ViewSesionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSesionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

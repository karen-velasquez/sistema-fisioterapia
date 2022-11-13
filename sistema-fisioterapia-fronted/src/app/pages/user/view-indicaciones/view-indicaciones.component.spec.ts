import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndicacionesComponent } from './view-indicaciones.component';

describe('ViewIndicacionesComponent', () => {
  let component: ViewIndicacionesComponent;
  let fixture: ComponentFixture<ViewIndicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIndicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIndicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

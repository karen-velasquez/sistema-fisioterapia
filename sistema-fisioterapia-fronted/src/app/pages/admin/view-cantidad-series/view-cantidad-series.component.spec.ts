import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCantidadSeriesComponent } from './view-cantidad-series.component';

describe('ViewCantidadSeriesComponent', () => {
  let component: ViewCantidadSeriesComponent;
  let fixture: ComponentFixture<ViewCantidadSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCantidadSeriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCantidadSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

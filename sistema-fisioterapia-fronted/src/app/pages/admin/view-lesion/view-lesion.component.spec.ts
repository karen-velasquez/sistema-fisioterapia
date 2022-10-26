import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLesionComponent } from './view-lesion.component';

describe('ViewLesionComponent', () => {
  let component: ViewLesionComponent;
  let fixture: ComponentFixture<ViewLesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

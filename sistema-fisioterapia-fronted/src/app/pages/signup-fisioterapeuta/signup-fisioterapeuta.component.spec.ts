import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFisioterapeutaComponent } from './signup-fisioterapeuta.component';

describe('SignupFisioterapeutaComponent', () => {
  let component: SignupFisioterapeutaComponent;
  let fixture: ComponentFixture<SignupFisioterapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFisioterapeutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupFisioterapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

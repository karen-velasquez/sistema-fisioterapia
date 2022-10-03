import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFisioterapeutaComponent } from './login-fisioterapeuta.component';

describe('LoginFisioterapeutaComponent', () => {
  let component: LoginFisioterapeutaComponent;
  let fixture: ComponentFixture<LoginFisioterapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFisioterapeutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFisioterapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

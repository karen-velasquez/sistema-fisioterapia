import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCrearUsuarioComponent } from './view-crear-usuario.component';

describe('ViewCrearUsuarioComponent', () => {
  let component: ViewCrearUsuarioComponent;
  let fixture: ComponentFixture<ViewCrearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCrearUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

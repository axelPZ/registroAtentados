import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDireccionComponent } from './registro-direccion.component';

describe('RegistroDireccionComponent', () => {
  let component: RegistroDireccionComponent;
  let fixture: ComponentFixture<RegistroDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

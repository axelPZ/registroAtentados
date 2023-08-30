import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarRegistroComponent } from './enviar-registro.component';

describe('EnviarRegistroComponent', () => {
  let component: EnviarRegistroComponent;
  let fixture: ComponentFixture<EnviarRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditarUsuarioComponent } from './add-editar-usuario.component';

describe('AddEditarUsuarioComponent', () => {
  let component: AddEditarUsuarioComponent;
  let fixture: ComponentFixture<AddEditarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditarPedidosComponent } from './add-editar-pedidos.component';

describe('AddEditarPedidosComponent', () => {
  let component: AddEditarPedidosComponent;
  let fixture: ComponentFixture<AddEditarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditarPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

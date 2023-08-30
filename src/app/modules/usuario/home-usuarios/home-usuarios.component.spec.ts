import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUsuariosComponent } from './home-usuarios.component';

describe('HomeUsuariosComponent', () => {
  let component: HomeUsuariosComponent;
  let fixture: ComponentFixture<HomeUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

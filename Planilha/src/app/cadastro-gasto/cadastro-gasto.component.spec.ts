import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGastoComponent } from './cadastro-gasto.component';

describe('CadastroGastoComponent', () => {
  let component: CadastroGastoComponent;
  let fixture: ComponentFixture<CadastroGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasfixasComponent } from './despesasfixas.component';

describe('DespesasfixasComponent', () => {
  let component: DespesasfixasComponent;
  let fixture: ComponentFixture<DespesasfixasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesasfixasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesasfixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

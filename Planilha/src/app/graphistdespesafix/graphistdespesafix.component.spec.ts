import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphistdespesafixComponent } from './graphistdespesafix.component';

describe('GraphistdespesafixComponent', () => {
  let component: GraphistdespesafixComponent;
  let fixture: ComponentFixture<GraphistdespesafixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphistdespesafixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphistdespesafixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

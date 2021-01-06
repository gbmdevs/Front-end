import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindespfixasComponent } from './admindespfixas.component';

describe('AdmindespfixasComponent', () => {
  let component: AdmindespfixasComponent;
  let fixture: ComponentFixture<AdmindespfixasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindespfixasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindespfixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

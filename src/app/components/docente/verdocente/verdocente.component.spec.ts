import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdocenteComponent } from './verdocente.component';

describe('VerdocenteComponent', () => {
  let component: VerdocenteComponent;
  let fixture: ComponentFixture<VerdocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddocenteComponent } from './adddocente.component';

describe('AdddocenteComponent', () => {
  let component: AdddocenteComponent;
  let fixture: ComponentFixture<AdddocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfacultComponent } from './verfacult.component';

describe('VerfacultComponent', () => {
  let component: VerfacultComponent;
  let fixture: ComponentFixture<VerfacultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfacultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfacultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

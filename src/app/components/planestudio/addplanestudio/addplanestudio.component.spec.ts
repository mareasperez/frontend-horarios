import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplanestudioComponent } from './addplanestudio.component';

describe('AddplanestudioComponent', () => {
  let component: AddplanestudioComponent;
  let fixture: ComponentFixture<AddplanestudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplanestudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplanestudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

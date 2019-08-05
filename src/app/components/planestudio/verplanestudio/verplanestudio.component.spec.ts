import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerplanestudioComponent } from './verplanestudio.component';

describe('VerplanestudioComponent', () => {
  let component: VerplanestudioComponent;
  let fixture: ComponentFixture<VerplanestudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerplanestudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerplanestudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

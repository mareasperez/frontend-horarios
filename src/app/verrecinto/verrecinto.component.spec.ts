import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerrecintoComponent } from './verrecinto.component';

describe('VerrecintoComponent', () => {
  let component: VerrecintoComponent;
  let fixture: ComponentFixture<VerrecintoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerrecintoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerrecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

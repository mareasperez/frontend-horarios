import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelrecintoComponent } from './delrecinto.component';

describe('DelrecintoComponent', () => {
  let component: DelrecintoComponent;
  let fixture: ComponentFixture<DelrecintoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelrecintoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelrecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

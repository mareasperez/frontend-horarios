import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecintoComponent } from './addrecinto.component';

describe('AddrecintoComponent', () => {
  let component: AddrecintoComponent;
  let fixture: ComponentFixture<AddrecintoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrecintoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

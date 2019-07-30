import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddareaComponent } from './addarea.component';

describe('AddareaComponent', () => {
  let component: AddareaComponent;
  let fixture: ComponentFixture<AddareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerareaComponent } from './verarea.component';

describe('VerareaComponent', () => {
  let component: VerareaComponent;
  let fixture: ComponentFixture<VerareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

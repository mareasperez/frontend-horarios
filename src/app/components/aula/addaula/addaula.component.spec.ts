import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaulaComponent } from './addaula.component';

describe('AddaulaComponent', () => {
  let component: AddaulaComponent;
  let fixture: ComponentFixture<AddaulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddaulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddaulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

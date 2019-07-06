import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfacultComponent } from './addfacult.component';

describe('AddfacultComponent', () => {
  let component: AddfacultComponent;
  let fixture: ComponentFixture<AddfacultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfacultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfacultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

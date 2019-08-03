import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeraulaComponent } from './veraula.component';

describe('VeraulaComponent', () => {
  let component: VeraulaComponent;
  let fixture: ComponentFixture<VeraulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeraulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeraulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

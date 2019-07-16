import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddepartamentoComponent } from './adddepartamento.component';

describe('AdddepartamentoComponent', () => {
  let component: AdddepartamentoComponent;
  let fixture: ComponentFixture<AdddepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdepartamentoComponent } from './verdepartamento.component';

describe('VerdepartamentoComponent', () => {
  let component: VerdepartamentoComponent;
  let fixture: ComponentFixture<VerdepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

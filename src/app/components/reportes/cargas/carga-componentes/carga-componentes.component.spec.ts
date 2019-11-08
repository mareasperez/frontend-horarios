import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaComponentesComponent } from './carga-componentes.component';

describe('CargaComponentesComponent', () => {
  let component: CargaComponentesComponent;
  let fixture: ComponentFixture<CargaComponentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaComponentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

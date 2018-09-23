import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTotalsComponent } from './adm-totals.component';

describe('AdmTotalsComponent', () => {
  let component: AdmTotalsComponent;
  let fixture: ComponentFixture<AdmTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

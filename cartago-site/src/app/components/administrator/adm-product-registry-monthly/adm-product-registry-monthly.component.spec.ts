import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmProductRegistryMonthlyComponent } from './adm-product-registry-monthly.component';

describe('AdmProductRegistryMonthlyComponent', () => {
  let component: AdmProductRegistryMonthlyComponent;
  let fixture: ComponentFixture<AdmProductRegistryMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmProductRegistryMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmProductRegistryMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

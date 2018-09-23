import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmProductAverageComponent } from './adm-product-average.component';

describe('AdmProductAverageComponent', () => {
  let component: AdmProductAverageComponent;
  let fixture: ComponentFixture<AdmProductAverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmProductAverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmProductAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

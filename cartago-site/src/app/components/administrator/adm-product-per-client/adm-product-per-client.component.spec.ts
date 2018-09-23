import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmProductPerClientComponent } from './adm-product-per-client.component';

describe('AdmProductPerClientComponent', () => {
  let component: AdmProductPerClientComponent;
  let fixture: ComponentFixture<AdmProductPerClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmProductPerClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmProductPerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

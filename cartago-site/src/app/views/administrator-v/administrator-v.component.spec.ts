import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorVComponent } from './administrator-v.component';

describe('AdministratorVComponent', () => {
  let component: AdministratorVComponent;
  let fixture: ComponentFixture<AdministratorVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

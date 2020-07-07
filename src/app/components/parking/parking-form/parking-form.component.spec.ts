import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingFormComponent } from './parking-form.component';

describe('ParkingFormComponent', () => {
  let component: ParkingFormComponent;
  let fixture: ComponentFixture<ParkingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

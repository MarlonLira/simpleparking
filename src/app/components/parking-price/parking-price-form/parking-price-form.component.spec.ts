import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPriceFormComponent } from './parking-price-form.component';

describe('ParkingPriceFormComponent', () => {
  let component: ParkingPriceFormComponent;
  let fixture: ComponentFixture<ParkingPriceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPriceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPriceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

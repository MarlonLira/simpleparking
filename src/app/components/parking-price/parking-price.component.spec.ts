import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPriceComponent } from './parking-price.component';

describe('ParkingPriceComponent', () => {
  let component: ParkingPriceComponent;
  let fixture: ComponentFixture<ParkingPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

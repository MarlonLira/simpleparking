import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPriceListComponent } from './parking-price-list.component';

describe('ParkingPriceListComponent', () => {
  let component: ParkingPriceListComponent;
  let fixture: ComponentFixture<ParkingPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

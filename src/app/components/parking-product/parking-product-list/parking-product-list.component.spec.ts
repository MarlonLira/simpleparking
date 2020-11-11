import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingProductListComponent } from './parking-product-list.component';

describe('ParkingProductListComponent', () => {
  let component: ParkingProductListComponent;
  let fixture: ComponentFixture<ParkingProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

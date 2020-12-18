import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingProductComponent } from './parking-product.component';

describe('ParkingProductComponent', () => {
  let component: ParkingProductComponent;
  let fixture: ComponentFixture<ParkingProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

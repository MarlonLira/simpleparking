import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingProductFormComponent } from './parking-product-form.component';

describe('ParkingProductFormComponent', () => {
  let component: ParkingProductFormComponent;
  let fixture: ComponentFixture<ParkingProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

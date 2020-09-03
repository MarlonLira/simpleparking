import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpaceListComponent } from './parking-space-list.component';

describe('ParkingSpaceListComponent', () => {
  let component: ParkingSpaceListComponent;
  let fixture: ComponentFixture<ParkingSpaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingSpaceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSpaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

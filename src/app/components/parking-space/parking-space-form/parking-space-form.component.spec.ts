import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpaceFormComponent } from './parking-space-form.component';

describe('ParkingSpaceFormComponent', () => {
  let component: ParkingSpaceFormComponent;
  let fixture: ComponentFixture<ParkingSpaceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingSpaceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSpaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

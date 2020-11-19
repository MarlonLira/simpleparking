import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingsSelectComponent } from './parkings-select.component';

describe('ParkingsSelectComponent', () => {
  let component: ParkingsSelectComponent;
  let fixture: ComponentFixture<ParkingsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

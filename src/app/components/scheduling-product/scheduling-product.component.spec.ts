import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingProductComponent } from './scheduling-product.component';

describe('SchedulingProductComponent', () => {
  let component: SchedulingProductComponent;
  let fixture: ComponentFixture<SchedulingProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

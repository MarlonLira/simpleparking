import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingProductListComponent } from './scheduling-product-list.component';

describe('SchedulingProductListComponent', () => {
  let component: SchedulingProductListComponent;
  let fixture: ComponentFixture<SchedulingProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

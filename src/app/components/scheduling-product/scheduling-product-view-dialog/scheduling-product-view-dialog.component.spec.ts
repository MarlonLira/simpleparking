import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingProductViewDialogComponent } from './scheduling-product-view-dialog.component';

describe('SchedulingProductViewDialogComponent', () => {
  let component: SchedulingProductViewDialogComponent;
  let fixture: ComponentFixture<SchedulingProductViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingProductViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingProductViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

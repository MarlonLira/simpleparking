import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingViewDialogComponent } from './scheduling-view-dialog.component';

describe('SchedulingViewDialogComponent', () => {
  let component: SchedulingViewDialogComponent;
  let fixture: ComponentFixture<SchedulingViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

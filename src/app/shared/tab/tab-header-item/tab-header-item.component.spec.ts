import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHeaderItemComponent } from './tab-header-item.component';

describe('TabHeaderItemComponent', () => {
  let component: TabHeaderItemComponent;
  let fixture: ComponentFixture<TabHeaderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabHeaderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabHeaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

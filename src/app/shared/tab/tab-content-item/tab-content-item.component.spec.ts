import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContentItemComponent } from './tab-content-item.component';

describe('TabContentItemComponent', () => {
  let component: TabContentItemComponent;
  let fixture: ComponentFixture<TabContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabContentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

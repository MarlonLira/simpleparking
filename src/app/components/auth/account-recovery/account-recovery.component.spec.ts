import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecoveryComponent } from './account-recovery.component';

describe('AccountRecoveryComponent', () => {
  let component: AccountRecoveryComponent;
  let fixture: ComponentFixture<AccountRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

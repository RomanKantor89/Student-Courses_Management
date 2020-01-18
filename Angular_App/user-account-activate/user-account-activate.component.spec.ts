import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountActivateComponent } from './user-account-activate.component';

describe('UserAccountActivateComponent', () => {
  let component: UserAccountActivateComponent;
  let fixture: ComponentFixture<UserAccountActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountCreateComponent } from './user-account-create.component';

describe('UserAccountCreateComponent', () => {
  let component: UserAccountCreateComponent;
  let fixture: ComponentFixture<UserAccountCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSubscriptionComponent } from './register-subscription.component';

describe('RegisterSubscriptionComponent', () => {
  let component: RegisterSubscriptionComponent;
  let fixture: ComponentFixture<RegisterSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSportsComponent } from './register-sports.component';

describe('RegisterSportsComponent', () => {
  let component: RegisterSportsComponent;
  let fixture: ComponentFixture<RegisterSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

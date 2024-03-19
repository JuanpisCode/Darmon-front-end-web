import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEntitiesComponent } from './register-entities.component';

describe('RegisterEntitiesComponent', () => {
  let component: RegisterEntitiesComponent;
  let fixture: ComponentFixture<RegisterEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEntitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEventsComponent } from './type-events.component';

describe('TypeEventsComponent', () => {
  let component: TypeEventsComponent;
  let fixture: ComponentFixture<TypeEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

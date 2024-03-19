import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSportComponent } from './all-sport.component';

describe('AllSportComponent', () => {
  let component: AllSportComponent;
  let fixture: ComponentFixture<AllSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

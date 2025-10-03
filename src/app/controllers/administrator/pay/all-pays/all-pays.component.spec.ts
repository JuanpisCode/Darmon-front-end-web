import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaysComponent } from './all-pays.component';

describe('AllPaysComponent', () => {
  let component: AllPaysComponent;
  let fixture: ComponentFixture<AllPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

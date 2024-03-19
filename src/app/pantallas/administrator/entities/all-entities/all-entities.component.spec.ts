import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEntitiesComponent } from './all-entities.component';

describe('AllEntitiesComponent', () => {
  let component: AllEntitiesComponent;
  let fixture: ComponentFixture<AllEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEntitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

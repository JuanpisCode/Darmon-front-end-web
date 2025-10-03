import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsClubsComponent } from './sports-clubs.component';

describe('SportsClubsComponent', () => {
  let component: SportsClubsComponent;
  let fixture: ComponentFixture<SportsClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsClubsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

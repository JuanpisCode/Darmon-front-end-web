import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClubsComponent } from './edit-clubs.component';

describe('EditClubsComponent', () => {
  let component: EditClubsComponent;
  let fixture: ComponentFixture<EditClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClubsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUsersComponent } from './category-users.component';

describe('CategoryUsersComponent', () => {
  let component: CategoryUsersComponent;
  let fixture: ComponentFixture<CategoryUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

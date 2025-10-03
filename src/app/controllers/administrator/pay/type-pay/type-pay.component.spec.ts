import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePayComponent } from './type-pay.component';

describe('TypePayComponent', () => {
  let component: TypePayComponent;
  let fixture: ComponentFixture<TypePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

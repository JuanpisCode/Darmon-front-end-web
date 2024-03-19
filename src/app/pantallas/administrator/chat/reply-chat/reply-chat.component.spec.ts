import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyChatComponent } from './reply-chat.component';

describe('ReplyChatComponent', () => {
  let component: ReplyChatComponent;
  let fixture: ComponentFixture<ReplyChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

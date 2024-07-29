import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRefuseDialogComponent } from './message-refuse-dialog.component';

describe('MessageRefuseDialogComponent', () => {
  let component: MessageRefuseDialogComponent;
  let fixture: ComponentFixture<MessageRefuseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageRefuseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageRefuseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

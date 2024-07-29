import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePeriodeDialogComponent } from './change-periode-dialog.component';

describe('ChangePeriodeDialogComponent', () => {
  let component: ChangePeriodeDialogComponent;
  let fixture: ComponentFixture<ChangePeriodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePeriodeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePeriodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

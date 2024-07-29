import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCoursAddEditComponent } from './prof-cours-add-edit.component';

describe('ProfCoursAddEditComponent', () => {
  let component: ProfCoursAddEditComponent;
  let fixture: ComponentFixture<ProfCoursAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfCoursAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfCoursAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

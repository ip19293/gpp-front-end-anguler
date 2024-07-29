import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursAddEditComponent } from './cours-add-edit.component';

describe('CoursAddEditComponent', () => {
  let component: CoursAddEditComponent;
  let fixture: ComponentFixture<CoursAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

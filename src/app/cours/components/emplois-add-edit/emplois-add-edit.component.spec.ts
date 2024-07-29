import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploisAddEditComponent } from './emplois-add-edit.component';

describe('EmploisAddEditComponent', () => {
  let component: EmploisAddEditComponent;
  let fixture: ComponentFixture<EmploisAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploisAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploisAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

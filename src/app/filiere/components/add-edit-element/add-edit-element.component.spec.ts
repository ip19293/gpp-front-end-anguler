import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditElementComponent } from './add-edit-element.component';

describe('AddEditElementComponent', () => {
  let component: AddEditElementComponent;
  let fixture: ComponentFixture<AddEditElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

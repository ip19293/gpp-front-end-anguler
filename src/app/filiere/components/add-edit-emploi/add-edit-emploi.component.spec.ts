import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmploiComponent } from './add-edit-emploi.component';

describe('AddEditEmploiComponent', () => {
  let component: AddEditEmploiComponent;
  let fixture: ComponentFixture<AddEditEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmploiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

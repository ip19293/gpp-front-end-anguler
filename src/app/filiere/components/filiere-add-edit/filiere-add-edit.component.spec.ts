import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereAddEditComponent } from './filiere-add-edit.component';

describe('FiliereAddEditComponent', () => {
  let component: FiliereAddEditComponent;
  let fixture: ComponentFixture<FiliereAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliereAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiliereAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

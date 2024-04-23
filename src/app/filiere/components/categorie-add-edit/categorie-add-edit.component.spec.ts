import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieAddEditComponent } from './categorie-add-edit.component';

describe('CategorieAddEditComponent', () => {
  let component: CategorieAddEditComponent;
  let fixture: ComponentFixture<CategorieAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

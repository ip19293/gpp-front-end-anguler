import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeAffectationComponent } from './groupe-affectation.component';

describe('GroupeAffectationComponent', () => {
  let component: GroupeAffectationComponent;
  let fixture: ComponentFixture<GroupeAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeAffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupeAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

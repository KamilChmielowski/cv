import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftSkillsComponent } from './soft-skills.component';

describe('SoftSkillsComponent', () => {
  let component: SoftSkillsComponent;
  let fixture: ComponentFixture<SoftSkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftSkillsComponent]
    });
    fixture = TestBed.createComponent(SoftSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

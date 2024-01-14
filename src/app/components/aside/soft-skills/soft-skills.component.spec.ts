import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { SoftSkillsComponent } from './soft-skills.component';

xdescribe('SoftSkillsComponent', () => {
  let component: SoftSkillsComponent;
  let fixture: ComponentFixture<SoftSkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule,
      ],
    });
    fixture = TestBed.createComponent(SoftSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

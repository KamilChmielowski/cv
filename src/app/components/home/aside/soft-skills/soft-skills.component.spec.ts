import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasmineUtil } from '../../../../utils/jasmine.util';
import { SoftSkillsComponent } from './soft-skills.component';
import { TranslateService } from '@ngx-translate/core';

describe('SoftSkillsComponent', () => {
  let component: SoftSkillsComponent;
  let fixture: ComponentFixture<SoftSkillsComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([SoftSkillsComponent])],
    });
    fixture = TestBed.createComponent(SoftSkillsComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render min 4 chips', () => {
    const chipsEl = fixture.debugElement.queryAll(By.css('app-chip'))

    expect(chipsEl.length).toBeGreaterThanOrEqual(4);
  });

  it('should pass translated content to app-chip components', () => {
    const elements = fixture.debugElement.queryAll(By.css('app-chip'));

    elements.forEach((element, i) => {
      translateService.get(`aside.soft-skills.${component.chipTranslations[i]}`).subscribe(value => {
        expect(element.nativeElement.innerHTML).toContain(value);
      });
    });
  });
});

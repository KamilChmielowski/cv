import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { githubLanguagesMock } from '../../../services/github/github.mock';
import { ProjectLangComponent } from './project-lang.component';

describe('ProjectLangComponent', () => {
  let component: ProjectLangComponent;
  let fixture: ComponentFixture<ProjectLangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectLangComponent]
    }).overrideComponent(ProjectLangComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const setLanguagesToComponent = (): void => {
    fixture.componentInstance.languages = githubLanguagesMock;
    fixture.detectChanges();
  }

  it('should create', () => expect(component).toBeTruthy());

  it('should render all provided languages', () => {
    setLanguagesToComponent();

    const languages = fixture.debugElement.queryAll(By.css('.lang'));
    const legendElements = fixture.debugElement.queryAll(By.css('li'));

    expect(languages.length)
      .withContext('Incorrect languages on the bar')
      .toBe(Object.keys(fixture.componentInstance.languages).length);

    expect(legendElements.length)
      .withContext('Incorrect languages in the legend')
      .toBe(Object.keys(fixture.componentInstance.languages).length);
  });

  it('should sum lang percentages to 100%', () => {
    setLanguagesToComponent();

    const languages = fixture.debugElement.queryAll(By.css('.lang'));
    const legendElements = fixture.debugElement.queryAll(By.css('.percent'));

    const sum = languages.reduce((init, lang) => {
      return init + +(lang.styles['width']?.replace('%', '') || 0)
    }, 0);

    const sum2 = legendElements.reduce((init, el) => {
      return init + +(el.nativeElement.textContent?.replace('%', '') || 0)
    }, 0);

    expect(sum > 99.9 && sum < 100.1)
      .withContext('Incorrect sum of bar percentages')
      .toBeTrue();

    expect(sum2 > 99.9 && sum < 100.1)
      .withContext('Incorrect sum of legend percentages')
      .toBeTrue();
  });

  it('should set classes based on language name', () => {
    setLanguagesToComponent();

    const languages = fixture.debugElement.queryAll(By.css('.lang'));
    const legendElements = fixture.debugElement.queryAll(By.css('.dot'));

    expect(languages.every((lang, i) => {
      const languagesToSet = Object.keys(lang.componentInstance.languages);
      return lang.classes[languagesToSet[i].toLowerCase()];
    })).withContext('Missing class for bar').toBeTrue();

    expect(legendElements.every((el, i) => {
      const languagesToSet = Object.keys(el.componentInstance.languages);
      return el.classes[languagesToSet[i].toLowerCase()];
    })).withContext('Missing class for percentages').toBeTrue();
  });
});

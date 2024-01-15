import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateService } from '@ngx-translate/core';

import { appIcons } from '../../../app-icons-map';
import { ChangeLangComponent } from './change-lang.component';
import { ChangeLangImports } from './change-lang.imports';
import { JasmineUtil } from '../../../utils/jasmine.util';

describe('ChangeLangComponent', () => {
  let component: ChangeLangComponent;
  let fixture: ComponentFixture<ChangeLangComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations(ChangeLangImports.imports)],
      providers: [JasmineUtil.svgIconSpyProvider()],
    });
    fixture = TestBed.createComponent(ChangeLangComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change lang upon click', () => {
    const buttonPlEl = fixture.debugElement.query(By.css('button.pl'));

    spyOn(translateService, 'use');

    buttonPlEl.nativeElement.click();
    fixture.detectChanges();

    expect(translateService.use).toHaveBeenCalledTimes(1);
  });

  it('should focus on different language button upon click', () => {
    const buttonPlEl = fixture.debugElement.query(By.css('button.pl'));
    const buttonEnEl = fixture.debugElement.query(By.css('button.en'));

    const click = (buttonClick: HTMLButtonElement, buttonFocus: HTMLButtonElement): boolean => {
      buttonClick.click();
      fixture.detectChanges();
      return document.activeElement === buttonFocus;
    }

    expect(click(buttonPlEl.nativeElement, buttonEnEl.nativeElement)).toBeTrue();
    expect(click(buttonEnEl.nativeElement, buttonPlEl.nativeElement)).toBeTrue();
  });

  it('should display existing icons', () => {
    const iconsEl = fixture.debugElement.queryAll(By.css('svg-icon'));
    const iconNames = appIcons.map(icons => icons[0]);
    const everyIconsExist = iconsEl.every(icon => iconNames.includes(icon.componentInstance.name));

    expect(everyIconsExist).toBeTrue();
  });

  it('should display language icons', () => {
    const iconsEl = fixture.debugElement.queryAll(By.css('svg-icon'));
    const iconNames = ['en', 'pl'];
    const containsLanguageIcons = iconsEl.every(icon => iconNames.includes(icon.componentInstance.name));

    expect(containsLanguageIcons).toBeTrue();
  });

  it('should set name or aria-label to button', () => {
    const buttonEl = fixture.debugElement.queryAll(By.css('button'));

    expect(buttonEl.every(el => !!el.nativeElement.textContent)
      || buttonEl.every(el => !!el.nativeElement.ariaLabel)).toBeTrue();
  });

  it('should display min two language buttons', () => {
    const buttonEl = fixture.debugElement.queryAll(By.css('button'));

    expect(buttonEl.length).toBeGreaterThanOrEqual(2);
  });
});

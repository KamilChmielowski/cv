import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { appIcons } from '../../../app-icons-map';
import { ChangeThemeComponent } from './change-theme.component';
import { CopyTextImports } from '../copy-text/copy-text.imports';
import { JasmineUtil } from '../../../utils/jasmine.util';

describe('ChangeThemeComponent', () => {
  let component: ChangeThemeComponent;
  let fixture: ComponentFixture<ChangeThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations(CopyTextImports.imports)],
      providers: [JasmineUtil.svgIconSpyProvider()],
    });
    fixture = TestBed.createComponent(ChangeThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display existing icons', () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));
    const iconNames = appIcons.map(icons => icons[0]);

    const click = (): DebugElement => {
      buttonEl.nativeElement.click();
      fixture.detectChanges();
      return fixture.debugElement.query(By.css('svg-icon'));
    }

    expect(iconNames.includes(click().componentInstance.name)).withContext('on view init').toBeTrue();
    expect(iconNames.includes(click().componentInstance.name)).withContext('after first theme change').toBeTrue();
    expect(iconNames.includes(click().componentInstance.name)).withContext('after second theme change').toBeTrue();
  });

  it('should change theme upon click', () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));
    const linkEl = fixture.debugElement.query(By.css('link'));

    const href = linkEl.nativeElement.href;

    buttonEl.nativeElement.click();
    fixture.detectChanges();

    expect(linkEl.nativeElement.href).not.toEqual(href);
  });

  it('should use existing theme file', () => {
    const href = fixture.debugElement.query(By.css('link')).nativeElement.href;

    expect(href.includes('dark.css') || href.includes('light.css')).toBeTrue();
  });

  it('should set name or aria-label to button', () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));

    expect(!!buttonEl.nativeElement.textContent || !!buttonEl.nativeElement.ariaLabel).toBeTrue();
  });
});

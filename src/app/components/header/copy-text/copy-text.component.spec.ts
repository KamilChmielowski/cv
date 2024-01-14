import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';

import { TranslateTestingModule } from 'ngx-translate-testing';

import { CopyTextComponent } from './copy-text.component';
import { CopyTextImports } from './copy-text.imports';

describe('CopyTextComponent', () => {
  let component: CopyTextComponent;
  let fixture: ComponentFixture<CopyTextComponent>;
  let clipboard: Clipboard;
  const clipboardSpy = jasmine.createSpyObj('Clipboard', ['copy']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CopyTextImports.imports,
        TranslateTestingModule
          .withTranslations('en', require('../../../../assets/i18n/en.json'))
          .withTranslations('pl', require('../../../../assets/i18n/pl.json')),
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: Clipboard, useValue: clipboardSpy },
      ]
    }).overrideComponent(CopyTextComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(CopyTextComponent);
    component = fixture.componentInstance;
    clipboard = TestBed.inject(Clipboard);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button', () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));

    expect(buttonEl).toBeTruthy();
  });

  it('should display button with text from input variable', () => {
    const textEl = fixture.debugElement
      .query(By.css('button'))
      .query(By.css('.text'));

    component.text = 'test';
    fixture.detectChanges();

    expect(textEl.nativeElement.textContent).toEqual(component.text);
  });

  it('should set aria label attribute from input variable', () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));

    component.aria = 'test';
    fixture.detectChanges();

    expect(buttonEl.nativeElement.ariaLabel).toEqual(component.aria);
  });

  it('should set aria label attribute from input variable', () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));

    component.aria = 'test';
    fixture.detectChanges();

    expect(buttonEl.nativeElement.ariaLabel).toEqual(component.aria);
  });

  it('should copy text to clipboard upon click', () => {
    component.text = 'test';
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement?.click();

    expect(clipboard.copy).toHaveBeenCalledWith('test');
  });

  it('should copy to clipboard alternative text if provided upon click', () => {
    component.text = 'test';
    component.copyText = 'altText';
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(clipboard.copy).toHaveBeenCalledWith('altText');
  });

  it('should show tooltip upon click', fakeAsync(() => {
    const buttonEl = fixture.debugElement.query(By.css('button'));

    buttonEl.nativeElement.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('class')).withContext('missing proper class').toContain('tooltip-visible');
    flush();
  }));

  it('should hide tooltip after 2s', fakeAsync(() => {
    const buttonEl = fixture.debugElement.query(By.css('button'));
    const tooltipEl = buttonEl.query(By.css('.tooltip'));

    buttonEl.nativeElement.click();
    fixture.detectChanges();
    tick(2000);

    expect(fixture.nativeElement.getAttribute('class')).withContext('missing proper class').not.toContain('tooltip-visible');
    expect(getComputedStyle(tooltipEl.nativeElement).opacity.toString()).withContext('missing proper css style').toBe('0');
  }));
});

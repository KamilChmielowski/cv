import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { SvgIconRegistryService } from 'angular-svg-icon';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { appIcons } from '../app-icons-map';
import { ValidatorUtil } from './validator.util';

export class JasmineUtil {
  static moduleWithTranslations(modules: any[]): any[] {
    return [
      ...modules,
      TranslateTestingModule
        .withTranslations('en', require('../../assets/i18n/en.json'))
        .withTranslations('pl', require('../../assets/i18n/pl.json')),
    ];
  }

  static svgIconSpyProvider(): any {
    return { provide: SvgIconRegistryService, useValue: jasmine.createSpyObj(['getSvgByName']) }
  }

  static shouldDisplayExistingIcons(fixture: ComponentFixture<any>): void {
    const svgIconsEl = fixture.debugElement.queryAll(By.css('svg-icon'));
    const iconNames = appIcons.map(icons => icons[0]);
    const everyIconsExist = svgIconsEl.every(icon => iconNames.includes(icon.componentInstance.name));
    expect(everyIconsExist).toBeTrue();
  }

  static shouldSetTextOrAriaLabelToClickableElement(fixture: ComponentFixture<any>, selector = '.clickable'): void {
    const clickableEl = [
      ...fixture.debugElement.queryAll(By.css('button')),
      ...fixture.debugElement.queryAll(By.css(selector)),
    ];
    expect(clickableEl.every(el => !!el.nativeElement.textContent || !!el.nativeElement.ariaLabel)).toBeTrue();
  }

  static shouldSetValidHref(fixture: ComponentFixture<any>, selector = '.clickable') {
    const elements = fixture.debugElement.queryAll(By.css(selector))
    expect(elements.every(el => ValidatorUtil.isValidHttpUrl(el.nativeElement.href))).toBeTrue();
  }

  static shouldPassRequiredInputs(elements: DebugElement[], inputNames: string[]): void {
    expect(elements.every(el => inputNames.every(name => !!el.componentInstance[name]))).toBeTrue();
  }

  static shouldRenderNgContent(component: any, text = 'ng-content test'): void {
    const testFixture = TestBed.createComponent(component);
    expect(testFixture.nativeElement.textContent).toContain(text);
  }

  static sectionTitleComponentUnitTests() {
    return {
      existingIcon: (element: DebugElement) => {
        const iconNames = appIcons.map(icons => icons[0]);
        expect(iconNames.includes(element.componentInstance.icon)).toBeTrue();
      },
      requiredInputs: (element: DebugElement) => {
        JasmineUtil.shouldPassRequiredInputs([element], ['title', 'icon']);
      }
    }
  }

  static timelineItemComponentUnitTests() {
    return {
      requiredInputs: (elements: DebugElement[]) => {
        JasmineUtil.shouldPassRequiredInputs(elements, ['date', 'chip', 'header']);
      }
    }
  }
}

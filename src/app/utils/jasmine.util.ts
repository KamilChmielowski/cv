import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, DebugElement } from '@angular/core';

import { SvgIconRegistryService } from 'angular-svg-icon';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { appIcons } from '../app-icons-map';
import { routes } from '../app-routing.module';
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

  static markForCheckSpy(fixture: ComponentFixture<any>): jasmine.Spy<any> {
    const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    return spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');
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

  static shouldRenderMinElements(fixture: ComponentFixture<any>, selector: string, min: number): void {
    expect(fixture.debugElement.queryAll(By.css(selector)).length).withContext(`Missing ${selector} selector`).toBeGreaterThanOrEqual(min);
  }

  static shouldRenderComponents(components: { [key: string]: DebugElement[] }): void {
    Object.entries(components).forEach(([key, component]) => {
      expect(component.length === 1).withContext(`missing ${key} component`).toBeTrue();
    });
  }

  static shouldSetValidHrefToElement(fixture: ComponentFixture<any>, selector = '.clickable'): void {
    const elements = fixture.debugElement.queryAll(By.css(selector));
    expect(elements.every(el => ValidatorUtil.isValidHttpUrl(el.nativeElement.href))).toBeTrue();
  }

  static shouldSetValidRouterLinkToElement(fixture: ComponentFixture<any>, selector = '.clickable'): void {
    const elements = fixture.debugElement.queryAll(By.css(selector))

    expect(elements.every(el => routes
      .some(route => route.path === el.attributes['routerLink'] || el.attributes['routerLink'] === '/')
    )).toBeTrue();
  }

  static shouldSetValidHrefToComponent(fixture: ComponentFixture<any>, selector = '.clickable', propertyName = 'href'): void {
    const elements = fixture.debugElement.queryAll(By.css(selector))
    expect(elements.every(el => {
      return el.componentInstance[propertyName] ? ValidatorUtil.isValidHttpUrl(el.componentInstance[propertyName]) : true;
    })).toBeTrue();
  }

  static shouldRenderNgContent(component: any, text = 'ng-content test'): void {
    const testFixture = TestBed.createComponent(component);
    expect(testFixture.nativeElement.textContent).toContain(text);
  }

  static shouldRenderOneWrapperElement(fixture: ComponentFixture<any>, selector: string): void {
    const elements = fixture.debugElement.queryAll(By.css(selector));

    expect(elements.length).withContext('too many elements').toBe(1);
    expect(fixture.debugElement.nativeElement.firstElementChild.localName)
      .withContext('component doesn\'t start with html mark').toEqual(selector);
    expect(fixture.debugElement.children.length)
      .withContext('doesn\'t wrap a html content').toBe(1);
  }

  static sectionTitleComponentUnitTests() {
    return {
      existingIcon: (element: DebugElement) => {
        const iconNames = appIcons.map(icons => icons[0]);
        expect(iconNames.includes(element.componentInstance.icon)).toBeTrue();
      }
    }
  }
}

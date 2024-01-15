import { DebugElement } from '@angular/core';

import { SvgIconRegistryService } from 'angular-svg-icon';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { appIcons } from '../app-icons-map';

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

  static sectionTitleComponentUnitTests() {
    return {
      existingIcon: (element: DebugElement) => {
        const iconNames = appIcons.map(icons => icons[0]);
        expect(iconNames.includes(element.componentInstance.icon)).toBeTrue();
      },
      requiredInputs: (element: DebugElement) => {
        expect(element.componentInstance.icon).withContext('missing icon input').toBeTruthy();
        expect(element.componentInstance.title).withContext('missing title input').toBeTruthy();
      }
    }
  }

  static timelineItemComponentUnitTests() {
    return {
      requiredInputs: (elements: DebugElement[]) => {
        expect(elements.every(item => !!item.componentInstance.date)).withContext('missing date input').toBeTrue();
        expect(elements.every(item => !!item.componentInstance.chip)).withContext('missing chip input').toBeTrue();
        expect(elements.every(item => !!item.componentInstance.header)).withContext('missing header input').toBeTrue();
      }
    }
  }
}

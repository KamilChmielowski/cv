import { SvgIconRegistryService } from 'angular-svg-icon';
import { TranslateTestingModule } from 'ngx-translate-testing';

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
}

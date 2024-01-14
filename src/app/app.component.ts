import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';

import { TranslateService } from '@ngx-translate/core';

import { appIconsMap } from './app-icons-map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private registry: SvgIconRegistryService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.initTranslationsLang();
    this.registerIcons();
  }

  private registerIcons(): void {
    for (const [name, data] of appIconsMap.entries()) {
      this.registry.addSvg(name, data);
    }
  }

  private initTranslationsLang(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}

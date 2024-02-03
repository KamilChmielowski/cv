import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { SvgIconRegistryService } from 'angular-svg-icon';

import { TranslateService } from '@ngx-translate/core';

import { appIconsMap } from './app-icons-map';
import { fadeAnimation } from './animations';
import { Languages } from './components/header/change-lang/change-lang.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  @HostBinding('class.starting-app') private startingApp = true;

  readonly defaultLang = Languages.en;

  constructor(
    private cdr: ChangeDetectorRef,
    private contexts: ChildrenOutletContexts,
    @Inject(DOCUMENT) private document: Document,
    private registry: SvgIconRegistryService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.initTranslationsLang();
    this.registerIcons();
    this.disableTransitionsOnStartingApp();
  }

  protected getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  private disableTransitionsOnStartingApp(): void {
    this.document.body.classList.add('starting-app');
    this.document.documentElement.classList.add('starting-app');

    setTimeout(() => {
      this.startingApp = false;
      this.document.body.classList.remove('starting-app');
      this.document.documentElement.classList.remove('starting-app');
    }, 600);
  }

  private registerIcons(): void {
    for (const [name, data] of appIconsMap.entries()) {
      this.registry.addSvg(name, data);
    }
  }

  private initTranslationsLang(): void {
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
  }
}

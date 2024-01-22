import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { ChangeLangImports } from './change-lang.imports';

export enum Languages {
  pl = 'pl', en = 'en'
}

@Component({
  selector: 'app-change-lang',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChangeLangImports.imports],
})
export class ChangeLangComponent {
  protected readonly languages = Languages;

  constructor(private translate: TranslateService) {}

  protected changeLang(lang: string, elementToFocus: HTMLButtonElement): void {
    this.translate.use(lang);
    elementToFocus.focus();
  }
}

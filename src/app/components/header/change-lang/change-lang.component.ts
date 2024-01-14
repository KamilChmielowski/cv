import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { ChangeLangImports } from './change-lang.imports';

@Component({
  selector: 'app-change-lang',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChangeLangImports.imports],
})
export class ChangeLangComponent {
  constructor(private translate: TranslateService) {}

  changeLang(lang: string, elementToFocus: HTMLButtonElement): void {
    this.translate.use(lang);
    elementToFocus.focus();
  }
}

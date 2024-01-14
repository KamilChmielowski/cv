import { CommonModule } from '@angular/common';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeUrlPipe } from './theme-url/theme-url.pipe';

export class CopyTextImports {
  public static readonly imports = [
    CommonModule,
    ThemeUrlPipe,
    SvgIconComponent,
    TranslateModule,
  ];
}

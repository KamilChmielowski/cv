import { CommonModule } from '@angular/common';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { ChangeLangComponent } from './change-lang/change-lang.component';
import { ChangeThemeComponent } from './change-theme/change-theme.component';
import { CopyTextComponent } from './copy-text/copy-text.component';

export class HeaderImports {
  public static readonly imports = [
    ChangeLangComponent,
    ChangeThemeComponent,
    CommonModule,
    CopyTextComponent,
    SvgIconComponent,
    TranslateModule,
  ]
}

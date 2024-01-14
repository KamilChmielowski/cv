import { CommonModule } from '@angular/common';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

export class ChangeLangImports {
  public static readonly imports = [
    CommonModule,
    SvgIconComponent,
    TranslateModule,
  ];
}

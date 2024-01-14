import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

export class CopyTextImports {
  public static readonly imports = [
    ClipboardModule,
    CommonModule,
    TranslateModule,
  ]
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { ChangeLangComponent } from './change-lang/change-lang.component';
import { CopyTextComponent } from './copy-text/copy-text.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChangeLangComponent,
    CommonModule,
    CopyTextComponent,
    SvgIconComponent,
    TranslateModule,
  ]
})
export class HeaderComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from 'angular-svg-icon';

import { Theme, ThemeUrlPipe } from './theme-url.pipe';
import { ThemeLiteralPipe } from './theme-value.pipe';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ThemeUrlPipe,
    SvgIconComponent,
    ThemeLiteralPipe,
  ]
})
export class ChangeThemeComponent {
  protected theme = Theme.dark;

  protected changeTheme(): void {
    this.theme = Theme.light === this.theme ? Theme.dark : Theme.light;
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CopyTextImports } from './change-theme.imports';
import { Theme } from './theme-url/theme-url.pipe';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CopyTextImports.imports],
})
export class ChangeThemeComponent {
  protected theme = Theme.dark;

  protected changeTheme(): void {
    this.theme = Theme.light === this.theme ? Theme.dark : Theme.light;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { Theme } from './theme-url.pipe';

@Pipe({
  name: 'themeValue',
  standalone: true,
})
export class ThemeLiteralPipe implements PipeTransform {
  transform(theme: Theme): Theme {
    return theme === Theme.light ? Theme.dark : Theme.light;
  }
}

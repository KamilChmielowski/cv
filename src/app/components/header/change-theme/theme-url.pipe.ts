import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

export enum Theme { light = 'light', dark = 'dark' }

@Pipe({
  name: 'themeUrl',
  standalone: true,
})
export class ThemeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(theme: Theme): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${theme}.css`);
  }
}

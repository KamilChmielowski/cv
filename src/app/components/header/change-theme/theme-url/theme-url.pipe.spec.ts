import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

import { Theme, ThemeUrlPipe } from './theme-url.pipe';

describe('ThemeValuePipe', () => {
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: (val: string) => val,
          }
        }
      ]
    });
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should return secured resource url', () => {
    const pipe = new ThemeUrlPipe(sanitizer);

    expect(pipe).toBeTruthy();
    expect(pipe.transform(Theme.light)).toEqual(`${Theme.light}.css`);
  });
});

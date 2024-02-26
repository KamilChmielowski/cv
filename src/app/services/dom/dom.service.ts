import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DomService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  static remToPixels(rem: number): number {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  isDesktop(): boolean {
    return this.getWindow().matchMedia('(min-width: 1024px)').matches;
  }

  getWindow(): Window {
    return this.document.defaultView!.window;
  }
}

import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter, map, Subscription } from 'rxjs';

import { fadeAnimationTimeout } from './page-animation';

@Directive({
  selector: '[pageAnimation]',
  standalone: true,
})
export class PageAnimationDirective implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();

  private isScrollable = true;
  private maxClientHeight: number = 0;
  private prevScrollX = 0;
  private prevScrollY = 0;
  private prevUrl!: string;
  private timeoutHandle!: NodeJS.Timeout;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.observeNavigationEnd();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event']) private onScroll(): void {
    if (!this.isScrollable) {
      window.scrollTo(this.prevScrollX, this.prevScrollY);
    } else {
      this.prevScrollX = window.scrollX;
      this.prevScrollY = window.scrollY;
    }
  }

  private observeNavigationEnd(): void {
    this.subscription.add(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => e as NavigationEnd),
      ).subscribe(result => {
        this.setPageHeightToMaxClient();
        this.timeoutHandle = setTimeout(() => this.setDefaultPageHeight(result.url), fadeAnimationTimeout * 2);
      })
    );
  }

  private setPageHeightToMaxClient(): void {
    this.isScrollable = false;
    clearTimeout(this.timeoutHandle);
    this.elementRef.nativeElement.style.setProperty('min-height', `${this.maxClientHeight}px`);
    this.elementRef.nativeElement.classList.toggle('no-scroll');
  }

  private setDefaultPageHeight(url: string): void {
    this.isScrollable = true;
    if ((this.elementRef.nativeElement.clientHeight || 0) > this.maxClientHeight) {
      this.maxClientHeight = this.elementRef.nativeElement.clientHeight;
    }
    this.elementRef.nativeElement.style.setProperty('min-height', `100vh`);
    this.elementRef.nativeElement.classList.toggle('no-scroll');
    this.prevUrl = url;
  }
}

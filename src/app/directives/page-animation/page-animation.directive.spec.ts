import { By } from '@angular/platform-browser';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from '../../app.component';
import { AppModule } from '../../app.module';
import { DomService } from '../../services/dom/dom.service';
import { fadeAnimationTimeout } from './page-animation';
import { PageAnimationDirective } from './page-animation.directive';
import { routes } from '../../app-routing.module';

describe('PageAnimationDirective', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let directive: any;
  let router: Router;
  let domMock: any;

  beforeEach(() => {
    domMock = jasmine.createSpyObj('WindowService', ['getWindow' , 'isDesktop', 'remToPixels']);

    TestBed.configureTestingModule({
      imports: [
        AppModule,
        PageAnimationDirective,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        PageAnimationDirective,
        { provide: ElementRef, useValue: { nativeElement: { clientHeight: 400 } } },
        { provide: DomService, useValue: domMock }
      ]
    });

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    directive = TestBed.inject(PageAnimationDirective);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should handle scroll state based on param isScrollable', fakeAsync(() => {
    domMock.getWindow.and.returnValue({
      scrollX: 0,
      scrollY: 100,
      scrollTo: () => null
    });

    (directive as any).isScrollable = false;
    (directive as any).onScroll();

    expect((directive as any).prevScrollY).withContext('disable scroll when isScrollable is false').toBe(0);

    (directive as any).isScrollable = true;
    (directive as any).onScroll();

    expect((directive as any).prevScrollY).withContext('enable scroll when isScrollable is true').toBe(100);
  }));

  it('should handle route change', fakeAsync(() => {
    const mainEl = fixture.debugElement.query(By.directive(PageAnimationDirective));

    expect(mainEl.classes['no-scroll']).withContext('enable scroll on init').toBeFalsy();
    expect(mainEl.styles['min-height']).withContext('min-height NOT set on init').toBeFalsy();

    router.navigate(['projects']);
    tick(0);
    expect(mainEl.classes['no-scroll']).withContext('disable scroll on page navigation').toBeTruthy();
    expect(mainEl.styles['min-height']).withContext('min-height set to max client height on page navigation').toContain('px');

    tick(fadeAnimationTimeout * 2 - 1)
    expect(mainEl.classes['no-scroll']).withContext('disable during page animation').toBeTruthy();
    expect(mainEl.styles['min-height']).withContext('min-height set to max client height on page navigation').toContain('px');

    tick(fadeAnimationTimeout * 2)
    expect(mainEl.classes['no-scroll']).withContext('enable scroll after page animation').toBeFalsy();
    expect(mainEl.styles['min-height']).withContext('min-height set to default').toEqual('100vh');
  }));
});

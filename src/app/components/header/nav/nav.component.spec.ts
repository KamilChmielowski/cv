import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DomMock } from '../../../services/dom/dom.mock';
import { DomService } from '../../../services/dom/dom.service';
import { JasmineUtil } from '../../../utils/jasmine.util';
import { NavComponent } from './nav.component';
import { routes } from '../../../app-routing.module';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let serviceMock: any;

  beforeEach(() => {
    serviceMock = DomMock.getService;

    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([
        HttpClientTestingModule,
        NavComponent,
        RouterTestingModule,
      ])],
      providers: [
        JasmineUtil.svgIconSpyProvider(),
        { provide: DomService, useValue: serviceMock }
      ],
    }).overrideComponent(NavComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render one header wrapper element', () => {
    JasmineUtil.shouldRenderOneWrapperElement(fixture, 'nav')
  });

  it('should display existing icons', () => {
    JasmineUtil.shouldDisplayExistingIcons(fixture);
  });

  it('should set name or aria-label to links', () => {
    JasmineUtil.shouldSetTextOrAriaLabelToClickableElement(fixture);
  });

  it('should set valid relative router links', () => {
    JasmineUtil.shouldSetValidRouterLinkToElement(fixture);
  });

  it('should render link elements to all routes', () => {
    const elements = fixture.debugElement.queryAll(By.css('.clickable'));

    expect(elements.length).toBe(routes.filter(route => route.component).length);
  });

  it('should fixed position when scrollY is above param value in rem',() => {
    const fixedPositionBreakpoint = DomService.remToPixels((component as any).fixedScrollYInRem);
    DomMock.init(serviceMock, fixedPositionBreakpoint + 1, fixedPositionBreakpoint);

    component.fixedLeft = 500;
    component.trackScrollPosition();
    fixture.detectChanges();

    expect(fixture.debugElement.classes['sticky']).toBeTruthy();
    expect(fixture.debugElement.styles['left']).toEqual('500px');
  });

  it('should absolute position when scrollY is below param value in rem',() => {
    DomMock.init(serviceMock, 0, DomService.remToPixels((component as any).fixedScrollYInRem));

    component.fixedLeft = 0;
    component.trackScrollPosition();
    fixture.detectChanges();

    expect(fixture.debugElement.classes['sticky']).toBeFalsy();
    expect(fixture.debugElement.styles['left']).toEqual('inherit');
  });
});

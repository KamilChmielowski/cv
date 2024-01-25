import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavComponent } from './nav.component';
import { JasmineUtil } from '../../../utils/jasmine.util';
import { routes } from '../../../app-routing.module';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([
        HttpClientTestingModule,
        NavComponent,
        RouterTestingModule,
      ])],
      providers: [JasmineUtil.svgIconSpyProvider()],
    });
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
});

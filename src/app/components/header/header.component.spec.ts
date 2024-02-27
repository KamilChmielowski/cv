import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { HeaderImports } from './header.imports';
import { JasmineUtil } from '../../utils/jasmine.util';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([
        ...HeaderImports.imports,
        RouterTestingModule,
      ])],
      providers: [
        JasmineUtil.svgIconSpyProvider(),
        { provide: ElementRef, useValue: { nativeElement: { getBoundingClientRect: () => ({ right: 400 })  } } }
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should display min 3 contact references', () => {
    const contactEl = fixture.debugElement.query(By.css('.contact'));
    const contactIconsEl = contactEl.queryAll(By.css('svg-icon'));

    expect(contactIconsEl.length).toBeGreaterThanOrEqual(3);
  });

  it('should display existing icons', () => {
    JasmineUtil.shouldDisplayExistingIcons(fixture);
  });

  it('should display proper name', () => {
    const header1El = fixture.debugElement.query(By.css('h1'));

    expect(header1El.nativeElement.textContent.toLowerCase()).toEqual('kamil chmielowski');
  });

  it('should display any position', () => {
    const header2El = fixture.debugElement.query(By.css('h2'));

    expect(header2El.nativeElement.textContent).toBeTruthy();
  });

  it('should pass aria and text inputs to app-copy-text component', () => {
    const items = fixture.debugElement.queryAll(By.css('app-copy-text'));

    expect(items.every(item => !!item.componentInstance.aria)).withContext('missing aria input').toBeTrue();
    expect(items.every(item => !!item.componentInstance.text)).withContext('missing text input').toBeTrue();
  });

  it('should render one header wrapper element', () => {
    JasmineUtil.shouldRenderOneWrapperElement(fixture, 'header')
  });

  it('should update navFixedLeftPos when window is resized', () => {
    const right = (component as any).elementRef.nativeElement.getBoundingClientRect().right;
    const navFixedLeftPosSnapshot = (component as any).navFixedLeftPos;

    spyOn((component as any).elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ right: right + 1 });
    window.dispatchEvent(new Event('resize'));

    expect(navFixedLeftPosSnapshot).toBeLessThan((component as any).navFixedLeftPos);
  });
});

import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { SvgIconRegistryService } from 'angular-svg-icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppModule, HttpLoaderFactory } from './app.module';
import { appIconsMap } from './app-icons-map';
import { JasmineUtil } from './utils/jasmine.util';
import { Languages } from './components/header/change-lang/change-lang.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;
  let svgIconRegistrySpy: SvgIconRegistryService;

  beforeEach(() => {
    svgIconRegistrySpy = jasmine.createSpyObj(['addSvg', 'getSvgByName']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [JasmineUtil.moduleWithTranslations([AppModule])],
      providers: [
        { provide: SvgIconRegistryService, useValue: svgIconRegistrySpy }
      ],
    }).overrideComponent(AppComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => expect(component).toBeTruthy());

  const getChildComponents = () => ({
    header: fixture.debugElement.queryAll(By.css('app-header')),
    main: fixture.debugElement.queryAll(By.css('main')),
    outlet: fixture.debugElement.queryAll(By.css('router-outlet')),
    footer: fixture.debugElement.queryAll(By.css('footer')),
  });

  it('should render all child components', () => {
    JasmineUtil.shouldRenderComponents(getChildComponents());
  });

  it('should pass translated content to footer', () => {
    const element = fixture.debugElement.query(By.css('footer'));

    translateService.get(`footer.copyright`).subscribe(value => {
      expect(element.nativeElement.innerHTML).toContain(value);
    })
  });

  it('should register all svg icons', () => {
      expect(svgIconRegistrySpy.addSvg).toHaveBeenCalledTimes(appIconsMap.size);
  });

  it('should set valid default translation language', fakeAsync(() => {
    expect(Object.values(Languages).includes(component.defaultLang)).toBeTrue();
  }));

  it('should use default en translation language', fakeAsync(() => {
    spyOn(translateService, 'setDefaultLang');
    spyOn(translateService, 'use');

    component.ngOnInit();

    flush();

    expect(translateService.setDefaultLang).toHaveBeenCalledOnceWith(component.defaultLang);
    expect(translateService.use).toHaveBeenCalledOnceWith(component.defaultLang);
  }));

  it('should manage starting-app class', fakeAsync(() => {
    expect(fixture.debugElement.classes['starting-app']).withContext('Missing class on app tag at the beginning').toBeTrue();
    expect(fixture.debugElement.parent?.classes['starting-app']).withContext('Missing class on body tag at the beginning').toBeTrue();
    expect(fixture.debugElement.parent?.parent?.classes['starting-app']).withContext('Missing class on html tag at the beginning').toBeTrue();

    component.ngOnInit();

    tick(599);
    fixture.detectChanges();

    expect(fixture.debugElement.classes['starting-app']).withContext('Missing class on app tag after 599ms').toBeTrue();
    expect(fixture.debugElement.parent?.classes['starting-app']).withContext('Missing class on body tag after 599ms').toBeTrue();
    expect(fixture.debugElement.parent?.parent?.classes['starting-app']).withContext('Missing class on html tag after 599ms').toBeTrue();

    flush();
    fixture.detectChanges();

    expect(fixture.debugElement.classes['starting-app']).withContext('Class on app tag should be removed after 600ms').toBeFalsy();
    expect(fixture.debugElement.parent?.classes['starting-app']).withContext('Class on body tag should be removed after 600ms').toBeFalsy();
    expect(fixture.debugElement.parent?.parent?.classes['starting-app']).withContext('Class on html tag should be removed after 600ms').toBeFalsy();
  }));
});

describe('should cover HttpLoaderFactory', () => {
  it('should initialize TranslateHttpLoader with proper params', () => {
    const httpClient = {} as any;
    expect(HttpLoaderFactory(httpClient)).toEqual(
      new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json')
    );
  });
});

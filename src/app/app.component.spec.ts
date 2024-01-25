import { By } from '@angular/platform-browser';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { SvgIconRegistryService } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
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
    });

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

    expect(translateService.setDefaultLang).toHaveBeenCalledOnceWith(component.defaultLang);
    expect(translateService.use).toHaveBeenCalledOnceWith(component.defaultLang);
  }));
});

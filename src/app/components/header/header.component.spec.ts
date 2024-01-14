import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconRegistryService } from 'angular-svg-icon';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { appIcons } from '../../app-icons-map';
import { HeaderComponent } from './header.component';
import { HeaderImports } from './header.imports';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const svgIconRegistryServiceSpy = jasmine.createSpyObj( ['getSvgByName'] );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderImports.imports,
        TranslateTestingModule
          .withTranslations('en', require('../../../assets/i18n/en.json'))
          .withTranslations('pl', require('../../../assets/i18n/pl.json')),
      ],
      providers: [
        { provide: SvgIconRegistryService, useValue: svgIconRegistryServiceSpy }
      ]
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
    const contactIconsEl = fixture.debugElement.queryAll(By.css('svg-icon'));
    const iconNames = appIcons.map(icons => icons[0]);
    const everyIconsExist = contactIconsEl.every(icon => iconNames.includes(icon.componentInstance.name));

    expect(everyIconsExist).toBeTrue();
  });

  it('should display proper name', () => {
    const header1El = fixture.debugElement.query(By.css('h1'));

    expect(header1El.nativeElement.textContent.toLowerCase()).toEqual('kamil chmielowski');
  });

  it('should display any position', () => {
    const header2El = fixture.debugElement.query(By.css('h2'));

    expect(header2El.nativeElement.textContent).toBeTruthy();
  });
});

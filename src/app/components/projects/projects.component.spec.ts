import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { GithubService } from '../../services/github/github.service';
import { githubLanguagesMock } from '../../services/github/github.mock';
import { JasmineUtil } from '../../utils/jasmine.util';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let translateService: TranslateService;
  let githubServiceSpy: any;

  beforeEach(() => {
    githubServiceSpy = jasmine.createSpyObj('GithubService',  ['getProjectLanguages']);
    githubServiceSpy.getProjectLanguages.and.returnValue(of(githubLanguagesMock));

    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([
        HttpClientTestingModule,
        ProjectsComponent,
      ])],
      providers: [
        JasmineUtil.svgIconSpyProvider(),
        { provide: GithubService, useValue: githubServiceSpy },
      ],
    }).overrideComponent(ProjectsComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render min 4 projects', () => {
    const min = fixture.componentInstance.languages.length + 2;
    JasmineUtil.shouldRenderMinElements(fixture, 'section', min);
    JasmineUtil.shouldRenderMinElements(fixture, 'app-project-item', min);
    JasmineUtil.shouldRenderMinElements(fixture, 'app-section-title', min);
    JasmineUtil.shouldRenderMinElements(fixture, 'app-features', min);
    JasmineUtil.shouldRenderMinElements(fixture, 'app-gallery', min);
    JasmineUtil.shouldRenderMinElements(fixture, 'app-project-lang', fixture.componentInstance.languages.length);
    JasmineUtil.shouldRenderMinElements(fixture, '.divider', min - 1);
  });

  it('should render components in proper order', () => {
    const sections = fixture.debugElement.queryAll(By.css('section'));
    const dividers = fixture.debugElement.queryAll(By.css('.divider'));

    expect(sections.every(section => section.nativeElement.nextSibling.localName === 'app-features')).toBeTrue();
    expect(sections.every(section => section.nativeElement.firstChild.localName === 'app-section-title')).toBeTrue();
    expect(sections.every(section => section.nativeElement.firstChild.nextSibling.localName === 'app-project-item')).toBeTrue();
    expect(sections.every(section => section.nativeElement.nextSibling.nextSibling.localName === 'app-gallery')).toBeTrue();
    expect(dividers.every(divider => divider.nativeElement.previousSibling.localName === 'app-gallery')).toBeTrue();
  });

  it('should set valid urls to app-project-item component', () => {
    JasmineUtil.shouldSetValidHrefToComponent(fixture, 'app-project-item');
  });

  it('should set valid githubUrl to app-project-item component', () => {
    JasmineUtil.shouldSetValidHrefToComponent(fixture, 'app-project-item', 'githubUrl');
  });

  it('should display existing icon', () => JasmineUtil.shouldDisplayExistingIcons(fixture));

  it('should pass translated content to app-project-item components in proper order', () => {
    const elements = fixture.debugElement.queryAll(By.css('app-project-item'));

    elements.forEach((element, i) => {
      translateService.get(`aside.projects.project-${i + 1}`).subscribe(value => {
        expect(element.nativeElement.innerHTML).toContain(value);
      })
    });
  });

  it('should call service n times to fetch projects languages n times', () => {
    expect(githubServiceSpy.getProjectLanguages).toHaveBeenCalledTimes(fixture.componentInstance.languages.length);
  });

  it('should refresh view after data receive', () => {
    const markForCheckSpy = JasmineUtil.markForCheckSpy(fixture);
    component.ngOnInit();
    expect(markForCheckSpy).toHaveBeenCalledTimes(1);
  });

  it('should passed translated content to features components', () => {
    const elements = fixture.debugElement.queryAll(By.css('app-features'));

    elements.forEach(element => {
      Array.from({ length: element.componentInstance.count }, (_, index) => index).forEach(v => {
        translateService.get(`projects.${element.componentInstance.key}.${v}`).subscribe(value => {
          expect(element.nativeElement.textContent).not.toContain(`projects.${element.componentInstance.key}.${v}`);
        });
      })
    });
  });
});

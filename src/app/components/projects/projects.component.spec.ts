import { By } from '@angular/platform-browser';
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
    });

    fixture = TestBed.createComponent(ProjectsComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render min 4 projects', () => {
    const min = 4;
    JasmineUtil.shouldRenderMinElements(fixture, 'section', min);
    JasmineUtil.shouldRenderMinElements(fixture, 'app-project-item', min);
    JasmineUtil.shouldRenderMinElements(fixture, 'app-section-title', min);
    JasmineUtil.shouldRenderMinElements(fixture, '.divider', min - 1);
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
});

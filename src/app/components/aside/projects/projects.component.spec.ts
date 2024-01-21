import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateService } from '@ngx-translate/core';

import { JasmineUtil } from '../../../utils/jasmine.util';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([ProjectsComponent])],
      providers: [JasmineUtil.svgIconSpyProvider()],
    });
    fixture = TestBed.createComponent(ProjectsComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render min 4 projects', () => {
    JasmineUtil.shouldRenderMinElements(fixture, 'app-project-item', 4);
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
});

import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideComponent } from './aside.component';
import { JasmineUtil } from '../../../utils/jasmine.util';

describe('AsideComponent', () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([AsideComponent])],
      providers: [JasmineUtil.svgIconSpyProvider()],
    });
    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render one aside wrapper element', () => {
    JasmineUtil.shouldRenderOneWrapperElement(fixture, 'aside')
  });

  it('should pass existing icon to app-section-title component', () => {
    JasmineUtil.sectionTitleComponentUnitTests()
      .existingIcon(fixture.debugElement.query(By.css('app-section-title')));
  });

  const getChildComponents = () => ({
    techStack: fixture.debugElement.queryAll(By.css('app-tech-stack')),
    softSkills: fixture.debugElement.queryAll(By.css('app-soft-skills')),
    projects: fixture.debugElement.queryAll(By.css('app-aside-projects')),
    languages: fixture.debugElement.queryAll(By.css('app-languages')),
  });

  it('should render all child components', () => {
    Object.entries(getChildComponents()).forEach(([key, component]) => {
      expect(component.length === 1).withContext(`Missing ${key} component`).toBeTrue();
    });
  });

  it('should render section title before child components', () => {
    Object.entries(getChildComponents()).forEach(([key, component]) => {
      expect(component.at(0)?.nativeElement.previousSibling.localName)
        .withContext(`Missing section-title before ${key} component`).toEqual('app-section-title');
    });
  });
});

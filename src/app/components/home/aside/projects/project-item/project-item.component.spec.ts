import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasmineUtil } from '../../../../../utils/jasmine.util';
import { ProjectItemComponent } from './project-item.component';

@Component({
  template: `<app-project-item title="test" href="https://test.com">ng-content test</app-project-item>`,
  standalone: true,
  imports: [ProjectItemComponent],
})
class ProjectItemTestComponent {}

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([
        ProjectItemComponent,
        ProjectItemTestComponent,
      ])],
      providers: [JasmineUtil.svgIconSpyProvider()],
    }).overrideComponent(ProjectItemComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render ng-content', () => JasmineUtil.shouldRenderNgContent(ProjectItemTestComponent));

  it('should use child components', () => {
    const itemChipsEl = fixture.debugElement.query(By.css('app-item-chips'));

    expect(itemChipsEl).toBeTruthy();
  });

  it('should set name or aria-label to buttons', () => {
    component.title = 'test';
    component.githubUrl = 'https://test.com'
    fixture.detectChanges();

    JasmineUtil.shouldSetTextOrAriaLabelToClickableElement(fixture);
  });

  it('should display existing icons', () => {
    component.githubUrl = 'https://test.com'
    fixture.detectChanges();

    JasmineUtil.shouldDisplayExistingIcons(fixture);
  });
});

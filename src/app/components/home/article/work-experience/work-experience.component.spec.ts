import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasmineUtil } from '../../../../utils/jasmine.util';
import { WorkExperienceComponent } from './work-experience.component';

describe('WorkExperienceComponent', () => {
  let component: WorkExperienceComponent;
  let fixture: ComponentFixture<WorkExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([WorkExperienceComponent])],
      providers: [JasmineUtil.svgIconSpyProvider()],
    });
    fixture = TestBed.createComponent(WorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());


  it('should display min one work reference', () => {
    expect(fixture.debugElement.queryAll(By.css('app-timeline-item')).length)
      .toBeGreaterThanOrEqual(1)
  });

  it('should pass existing icon to app-section-title component', () => {
    JasmineUtil.sectionTitleComponentUnitTests().existingIcon(fixture.debugElement.query(By.css('app-section-title')));
  });
});

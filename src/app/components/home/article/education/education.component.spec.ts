import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationComponent } from './education.component';
import { JasmineUtil } from '../../../../utils/jasmine.util';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([EducationComponent])],
      providers: [JasmineUtil.svgIconSpyProvider()],
    });
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should display min three education references', () => {
    expect(fixture.debugElement.queryAll(By.css('app-timeline-item')).length)
      .toBeGreaterThanOrEqual(3)
  });

  it('should pass existing icon to app-section-title component', () => {
    JasmineUtil.sectionTitleComponentUnitTests().existingIcon(fixture.debugElement.query(By.css('app-section-title')));
  });

  it('should pass title and icon inputs to app-section-title component', () => {
    JasmineUtil.sectionTitleComponentUnitTests().requiredInputs(fixture.debugElement.query(By.css('app-section-title')));
  });

  it('should pass date, chip, header inputs to app-timeline-item component', () => {
    JasmineUtil.timelineItemComponentUnitTests().requiredInputs(fixture.debugElement.queryAll(By.css('app-timeline-item')))
  });
});

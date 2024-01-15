import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { appIcons } from '../../../app-icons-map';
import { JasmineUtil } from '../../../utils/jasmine.util';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display min one work reference', () => {
    expect(fixture.debugElement.queryAll(By.css('app-timeline-item')).length)
      .toBeGreaterThanOrEqual(1)
  });

  it('should pass existing icon to app-section-title component', () => {
    const element = fixture.debugElement.query(By.css('app-section-title'));
    const iconNames = appIcons.map(icons => icons[0]);

    expect(iconNames.includes(element.componentInstance.icon)).toBeTrue();
  });

  it('should pass title and icon inputs to app-section-title component', () => {
    const element = fixture.debugElement.query(By.css('app-section-title'));

    expect(element.componentInstance.icon).withContext('missing icon input').toBeTruthy();
    expect(element.componentInstance.title).withContext('missing title input').toBeTruthy();
  });

  it('should pass date, chip, header inputs to app-timeline-item component', () => {
    const items = fixture.debugElement.queryAll(By.css('app-timeline-item'));

    expect(items.every(item => !!item.componentInstance.date)).withContext('missing chip input').toBeTrue();
    expect(items.every(item => !!item.componentInstance.chip)).withContext('missing chip input').toBeTrue();
    expect(items.every(item => !!item.componentInstance.header)).withContext('missing chip input').toBeTrue();
  });
});

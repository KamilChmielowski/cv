import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JasmineUtil } from '../../../utils/jasmine.util';
import { TimelineItemComponent } from './timeline-item.component';

@Component({
  template: `<app-timeline-item>ng-content test</app-timeline-item>`
})
class TimelineItemTestComponent {}

describe('TimelineItemComponent', () => {
  let component: TimelineItemComponent;
  let fixture: ComponentFixture<TimelineItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineItemTestComponent],
      imports: [
        CommonModule,
        TimelineItemComponent,
      ]
    }).overrideComponent(TimelineItemComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should use header from input', () => {
    const headerEl = fixture.debugElement.query(By.css('h3'));

    component.header = 'test';
    fixture.detectChanges();

    expect(headerEl.nativeElement.textContent).toEqual(component.header);
  });

  it('should use date from input', () => {
    const paragraphEl = fixture.debugElement.query(By.css('.date'));

    component.date = 'test';
    fixture.detectChanges();

    expect(paragraphEl.nativeElement.textContent).toEqual(component.date);
  });

  it('should use chip from input', () => {
    component.chip = 'test';
    fixture.detectChanges();

    const paragraphEl = fixture.debugElement.query(By.css('.chip'));

    expect(paragraphEl.nativeElement.textContent).toEqual(component.chip);
  });

  it('should not define chip initially', () => expect(component.chip).toBeFalsy());

  it('should render chip only if input is set', () => {
    component.chip = 'test';
    fixture.detectChanges();

    let paragraphEl = fixture.debugElement.query(By.css('.chip'));
    expect(paragraphEl).withContext('to truthy value').toBeTruthy();

    component.chip = '';
    fixture.detectChanges();

    paragraphEl = fixture.debugElement.query(By.css('.chip'));
    expect(paragraphEl).withContext('to falsy value').toBeFalsy();
  });

  it('should render ng-content', () => JasmineUtil.shouldRenderNgContent(TimelineItemTestComponent));
});

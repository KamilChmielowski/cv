import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasmineUtil } from '../../../../utils/jasmine.util';
import { ProgressBarComponent } from './progress-bar.component';

@Component({
  template: `<app-progress-bar>ng-content test</app-progress-bar>`
})
class ProgressBarTestComponent {}

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBarTestComponent],
      imports: [ProgressBarComponent],
    }).overrideComponent(ProgressBarComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => expect(component).toBeTruthy());

  it('should render ng-content', () => JasmineUtil.shouldRenderNgContent(ProgressBarTestComponent));

  it('should use percent input to set bar width in percents', () => {
    const barEl = fixture.debugElement.query(By.css('.value'));

    component.percent = '50';
    fixture.detectChanges();

    expect(barEl.styles['width']).toEqual(`${component.percent}%`);
  });
});

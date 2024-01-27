import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { AboutMeComponent } from './about-me.component';
import { CurrentYearService } from '../../../../services/current-year/current-year.service';
import { JasmineUtil } from '../../../../utils/jasmine.util';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;
  let currentYearServiceSpy: any;

  beforeEach(waitForAsync(() => {
    currentYearServiceSpy = jasmine.createSpyObj('CurrentYearService',  ['getCurrentYear']);
    currentYearServiceSpy.getCurrentYear.and.returnValue(of(new Date().getFullYear()));

    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([
        AboutMeComponent,
        HttpClientTestingModule,
      ])],
      providers: [
        JasmineUtil.svgIconSpyProvider(),
        { provide: CurrentYearService, useValue: currentYearServiceSpy },
      ],
    }).overrideComponent(AboutMeComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should pass title and icon inputs to app-section-title component', () => {
    JasmineUtil.sectionTitleComponentUnitTests().requiredInputs(fixture.debugElement.query(By.css('app-section-title')));
  });

  it('should display existing icons', () => {
    JasmineUtil.shouldDisplayExistingIcons(fixture);
  });

  it('should set name or aria-label to links', () => {
    JasmineUtil.shouldSetTextOrAriaLabelToClickableElement(fixture, '.references');
  });

  it('should set valid reference href urls', () => {
    JasmineUtil.shouldSetValidHrefToElement(fixture, '.references');
  });

  it('should call service to fetch current year', () => {
    expect(currentYearServiceSpy.getCurrentYear).toHaveBeenCalledTimes(1);
  });

  it('should refresh view after data receive', () => {
    const markForCheckSpy = JasmineUtil.markForCheckSpy(fixture);
    component.ngOnInit();
    expect(markForCheckSpy).toHaveBeenCalledTimes(1);
  });
});

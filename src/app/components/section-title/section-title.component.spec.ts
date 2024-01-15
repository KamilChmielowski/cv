import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasmineUtil } from '../../utils/jasmine.util';
import { SectionTitleComponent } from './section-title.component';
import { SectionTitleImports } from './section-title.imports';

describe('SectionTitleComponent', () => {
  let component: SectionTitleComponent;
  let fixture: ComponentFixture<SectionTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SectionTitleImports.imports],
      providers: [JasmineUtil.svgIconSpyProvider()],
    }).overrideComponent(SectionTitleComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(SectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should display defined header content', () => {
    const valueEl = fixture.debugElement.query(By.css('.value'));

    component.title = 'test';
    fixture.detectChanges();

    expect(valueEl.nativeElement.textContent.length).toBeTruthy();
  });

  it('should use title value from input', () => {
    const valueEl = fixture.debugElement.query(By.css('.value'));

    component.title = 'test';
    fixture.detectChanges();

    expect(valueEl.nativeElement.textContent).toEqual(component.title);
  });

  it('should use icon name from input', () => {
    const iconEl = fixture.debugElement.query(By.css('svg-icon'));

    component.icon = 'test';
    fixture.detectChanges();

    expect(iconEl.componentInstance.name).toEqual(component.icon);
  });
});

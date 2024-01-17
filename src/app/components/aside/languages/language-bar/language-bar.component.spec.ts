import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { JasmineUtil } from '../../../../utils/jasmine.util';
import { LanguageBarComponent } from './language-bar.component';

@Component({
  template: `<app-language-bar>ng-content test</app-language-bar>`
})
class LanguageBarTestComponent {}

describe('LanguageBarComponent', () => {
  let component: LanguageBarComponent;
  let fixture: ComponentFixture<LanguageBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageBarTestComponent],
      imports: [
        CommonModule,
        LanguageBarComponent
      ],
    }).overrideComponent(LanguageBarComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should render ng-content', () => JasmineUtil.shouldRenderNgContent(LanguageBarTestComponent));

  it('should render 10 rects', () => {
    const rectsEl = fixture.debugElement.queryAll(By.css('.rect'));

    expect(rectsEl.length).toEqual(10);
  });

  it('should filled rects count equal to value input', () => {
    component.value = '5';
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.fill')).length).toEqual(+component.value);
  });
});

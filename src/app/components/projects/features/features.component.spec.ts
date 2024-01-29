import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { FeaturesComponent } from './features.component';
import { JasmineUtil } from '../../../utils/jasmine.util';

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([FeaturesComponent])]
    }).overrideComponent(FeaturesComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render unordered list with required elements', () => {
    component.count = 5;
    component.key = 'test';
    fixture.detectChanges();

    const ul = fixture.debugElement.query(By.css('ul'));
    const liElements = ul.queryAll(By.css('li'))

    expect(ul).toBeTruthy();
    expect(liElements.length).toEqual(component.count);
  });

  it('should render content from translation based on inputs', () => {
    component.count = 5;
    component.key = 'not-existed-project';
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('li'));

    elements.forEach((element, i) => {
      translateService.get(`projects.${component.key}.${i}`).subscribe(value => {
        expect(element.nativeElement.textContent).toContain(value);
      });
    });
  });
});

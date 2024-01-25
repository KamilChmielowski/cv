import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasmineUtil } from '../../../../utils/jasmine.util';
import { LanguagesComponent } from './languages.component';

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JasmineUtil.moduleWithTranslations([
        LanguagesComponent,
      ])],
    });
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should display one native language', () => {
    expect(fixture.debugElement.queryAll(By.css('.native')).length).toEqual(1);
  });

  it('should display min one foreign language', () => {
    expect(fixture.debugElement.queryAll(By.css('app-language-bar')).length).toEqual(1);
  });

  it('should pass value to app-language-bar elements', () => {
    const bars = fixture.debugElement.queryAll(By.css('app-language-bar'));
    expect(bars.every(bar => +bar.componentInstance.value > 0)).toBeTrue();
  });
});

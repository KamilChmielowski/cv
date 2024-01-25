import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JasmineUtil } from '../../../utils/jasmine.util';
import { By } from '@angular/platform-browser';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        JasmineUtil.moduleWithTranslations([
          ArticleComponent,
          HttpClientTestingModule,
        ]),
      ],
      providers: [
        JasmineUtil.svgIconSpyProvider(),
      ]
    });
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render min 3 sections', () => {
    const sectionsEl = fixture.debugElement.queryAll(By.css('section'))

    expect(sectionsEl.length).toBeGreaterThanOrEqual(3);
  });

  it('should wrap html content in article markup', () => {
    expect(fixture.debugElement.queryAll(By.css('article')).length)
      .withContext('renders improper number of article markups').toEqual(1);
    expect((fixture.nativeElement.firstElementChild.localName))
      .withContext('does not start with article markup').toEqual('article');
  });
});

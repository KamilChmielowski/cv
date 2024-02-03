import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleGallery, CvGallery, SongbookGallery, WeatherGallery } from '../galleries.data';
import { JasmineUtil } from '../../../utils/jasmine.util';
import { GalleryComponent } from './gallery.component';
import { TranslateService } from '@ngx-translate/core';
import { ValidatorUtil } from '../../../utils/validator.util';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: JasmineUtil.moduleWithTranslations([GalleryComponent]),
      providers: [JasmineUtil.svgIconSpyProvider()],
    }).overrideComponent(GalleryComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render all images', () => {
    component.images = CvGallery;
    fixture.detectChanges();

    const images = fixture.debugElement.queryAll(By.css('img'));
    const modal = fixture.debugElement.query(By.css('.slide-modal'));
    const modalImages = modal.queryAll(By.css('img'));
    const preview = modal.query(By.css('.image-row-preview'));
    const previewImages = preview.queryAll(By.css('img'));

    expect(images.length)
      .withContext('Incorrect number of gallery images in component')
      .toBe(component.images.length * 6);

    expect(modalImages.length)
      .withContext('Incorrect number of original images')
      .toBe(component.images.length * 5);

    expect(previewImages.length)
      .withContext('Incorrect number of gallery images in lightbox')
      .toBe(component.images.length);
  });

  it('should set valid reference href urls', () => {
    JasmineUtil.shouldSetValidImageProperties(fixture);
  });

  it('should set name or aria-label to buttons', () => {
    JasmineUtil.shouldSetTextOrAriaLabelToClickableElement(fixture);
  });

  it('should display existing icons', () => {
    JasmineUtil.shouldDisplayExistingIcons(fixture);
  });

  it('should use defined translations', () => {
    const elements = fixture.debugElement.queryAll(By.css('.btn'));

    elements.forEach(element => {
      const key = element.properties['attr.aria-label'];
      translateService.get(key).subscribe(value => {
        expect(value)
          .withContext(`Missing key '${key}' for button with class ${Object.keys(element.classes)}`)
          .not.toEqual(key);
      })
    });
  });

  it('should set valid galleries data', () => {
    const data = [
      ...CvGallery,
      ...WeatherGallery,
      ...BibleGallery,
      ...SongbookGallery,
    ];

    data.forEach(element => {
      translateService.get(element.altKey).subscribe(value => {
        expect(value)
          .withContext(`Missing key '${element.altKey}' in translations`)
          .not.toEqual(element.altKey);
      });

      expect(ValidatorUtil.isValidHttpUrl(element.srcUrl))
        .withContext(`Invalid srlUrl ${element.srcUrl}`).toBeTrue();

      expect(ValidatorUtil.isValidHttpUrl(element.previewUrl))
        .withContext(`Invalid previewUrl ${element.previewUrl}`).toBeTrue();

      expect(element.srcUrl.endsWith('.webp'))
        .withContext(`SrlUrl ${element.srcUrl} should be in format *.webp`).toBeTrue();

      expect(element.previewUrl.endsWith('.webp'))
        .withContext(`PreviewUrl ${element.previewUrl} should be in format *.webp`).toBeTrue();
    });
  });
});

import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

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

  it('should open dialog on image click', fakeAsync(() => {
    fixture.componentInstance.images = CvGallery;
    fixture.detectChanges();

    const component = (fixture.componentInstance as any);
    const imageBtn = fixture.debugElement.query(By.css('.image-column'));

    imageBtn.nativeElement.click();

    flush();

    expect(component.isDisplayed).withContext('Still not displayed').toBeTrue();
    expect(component.isVisible).withContext('Still not visible').toBeTrue();
  }));

  it('should close dialog using close button', fakeAsync(() => {
    const component = (fixture.componentInstance as any);

    component.openModal();

    tick(1);

    const modal = fixture.debugElement.query(By.css('.slide-modal'));
    const closeBtn = modal.children[0];

    closeBtn.nativeElement.click();

    expect(component.isVisible).withContext('Still visible').toBeFalse();
    expect(component.isDisplayed).withContext('Displays modal before delay').toBeTrue();
    tick(450);
    expect(component.isDisplayed).withContext('Still displayed').toBeFalse();
  }));

  it('should close dialog using escape keyboard press', fakeAsync(() => {
    const component = (fixture.componentInstance as any);

    component.openModal();

    fixture.debugElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'escape' }));
    fixture.detectChanges();

    expect(component.isVisible).withContext('Still visible').toBeFalse();
    expect(component.isDisplayed).withContext('Displays modal before delay').toBeTrue();
    tick(450);
    expect(component.isDisplayed).withContext('Still displayed').toBeFalse();
  }));

  it('should move slide in proper order', fakeAsync(() => {
    fixture.componentInstance.images = CvGallery;
    fixture.detectChanges();

    const imageRow = fixture.debugElement.query(By.css('.image-row'));
    const images = imageRow.queryAll(By.css('.image-column'));

    images[0].nativeElement.click();

    flush();

    const modalContent = fixture.debugElement.query(By.css('.slide-modal-content'));
    const slides = modalContent.queryAll(By.css('.img-slides'));
    const slide1PreviewImages = slides[0].queryAll(By.css('.image-column'));
    const slide2PreviewImages = slides[1].queryAll(By.css('.image-column'));

    expect(slides[0].classes['hide']).withContext('Should show first slide').toBeFalsy();
    expect(slides[1].classes['hide']).withContext('Should hide second slide').toBeTruthy();

    expect(slide1PreviewImages[0].classes['active']).withContext('Clicked image should has active class').toBeTruthy();
    expect(slide1PreviewImages[1].classes['active']).withContext('Not clicked image should not has active class').toBeFalsy();

    const nextBtn = fixture.debugElement.query(By.css('.next'));
    const prevBtn = fixture.debugElement.query(By.css('.prev'));

    nextBtn.nativeElement.click();
    flush();

    expect(slides[1].classes['hide']).withContext('Should show second slide').toBeFalsy();
    expect(slides[0].classes['hide']).withContext('Should hide first slide').toBeTruthy();
    expect(slide2PreviewImages[1].classes['active']).withContext('Next image should has active class').toBeTruthy();
    expect(slide2PreviewImages[0].classes['active']).withContext('Previous image should not has active class').toBeFalsy();

    prevBtn.nativeElement.click();
    flush();

    expect(slides[0].classes['hide']).withContext('Should return to first slide').toBeFalsy();
    expect(slides[1].classes['hide']).withContext('Should hide exited slide').toBeTruthy();

    expect(slide1PreviewImages[0].classes['active']).withContext('First preview images should has active class again').toBeTruthy();
    expect(slide1PreviewImages[1].classes['active']).withContext('Exited preview images should not has active class again').toBeFalsy();

  }));
});

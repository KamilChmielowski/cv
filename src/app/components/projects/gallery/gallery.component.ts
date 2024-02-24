import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { GalleryModel } from './gallery.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    TranslateModule,
  ],
})
export class GalleryComponent {
  @Input({ required: true }) images!: GalleryModel[];

  @HostBinding('class.displayed') private isDisplayed = false;
  @HostBinding('class.visible') private isVisible = false;

  protected slideIndex = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
  ) {}

  protected openModal(): void {
    this.isDisplayed = true;
    setTimeout(() => {
      this.isVisible = true;
      this.cdr.markForCheck();
    });
    window.document.body.classList.add('no-scroll');
  }

  protected closeModal(): void {
    this.isVisible = false;
    setTimeout(() => {
      this.isDisplayed = false;
      this.cdr.markForCheck();
    }, 450);
    window.document.body.classList.remove('no-scroll');
  }

  protected moveSlide(n: number): void {
    this.showSlide(this.slideIndex += n);
  }

  protected currentSlide(n: number): void {
    this.showSlide(this.slideIndex = n);
  }

  private showSlide(n: number): void {
    const slides = this.elementRef.nativeElement.getElementsByClassName('img-slides') as HTMLCollectionOf<HTMLElement>;
    this.slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : this.slideIndex;

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.add('hide');
    }
    slides.item(this.slideIndex - 1)?.classList.remove('hide');

    setTimeout(() => {
      (slides.item(this.slideIndex - 1)
        ?.querySelector('.image-row')
        ?.children.item(n - 1) as HTMLButtonElement
      )?.focus();
    })
  }

  @HostListener('keydown.escape', ['$event']) private onKeydownHandler(): void {
    this.closeModal();
  }
}

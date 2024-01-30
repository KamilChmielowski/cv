import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightgalleryModule } from 'lightgallery/angular';
import lgZoom from 'lightgallery/plugins/zoom';
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
    LightgalleryModule,
    TranslateModule,
  ],
})
export class GalleryComponent {
  @Input({ required: true }) images!: GalleryModel[];

  protected readonly settings = {
    counter: false,
    plugins: [lgZoom],
  };

  protected readonly onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
  };
}

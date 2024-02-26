import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Inject,
  Input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { DomService } from '../../../services/dom/dom.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    SvgIconComponent,
    TranslateModule,
    RouterLinkActive,
  ]
})
export class NavComponent {
  @Input({ required: true }) fixedLeft!: number;

  @HostBinding('style.left') styleLeft!: number | string;
  @HostBinding('class.sticky') sticky: boolean = false;

  private readonly fixedScrollYInRem = 9;

  constructor(private domService: DomService,
    @Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', ['$event'])
  trackScrollPosition(): void {
    if (this.domService.isDesktop()) {
      this.sticky = (this.domService.getWindow().scrollY || 0) > DomService.remToPixels(this.fixedScrollYInRem);
      this.styleLeft = this.sticky ? `${this.fixedLeft}px` : 'inherit';
    }
  }
}

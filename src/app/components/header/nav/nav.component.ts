import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { DomUtil } from '../../../utils/dom.util';

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

  @HostListener('window:scroll', ['$event'])
  private trackScrollPosition(): void {
    this.sticky = window.scrollY > DomUtil.remToPixels(9);
    this.styleLeft = this.sticky ? `${this.fixedLeft}px` : 'inherit';
  }
}

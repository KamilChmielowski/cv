import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';

import { environment } from '../../../environments/environment';
import { HeaderImports } from './header.imports';
import { NavComponent } from './nav/nav.component';
import { DomUtil } from '../../utils/dom.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderImports.imports,
    NavComponent
  ],
})
export class HeaderComponent implements AfterViewInit {
  protected readonly environment = environment;
  protected readonly location = location;

  protected navFixedLeftPos!: number;

  constructor(private elementRef: ElementRef<HTMLElement>,) {}

  ngAfterViewInit(): void {
    this.updateNavFixedLeftPos();
  }

  @HostListener('window:resize', ['$event'])
  private trackWindowResize(): void {
    this.updateNavFixedLeftPos();
  }

  private updateNavFixedLeftPos(): void {
    this.navFixedLeftPos = this.elementRef.nativeElement.getBoundingClientRect().right + DomUtil.remToPixels(3);
  }
}

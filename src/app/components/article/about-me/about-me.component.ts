import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { CurrentYearService } from '../../../services/current-year/current-year.service';
import { SectionTitleComponent } from '../../section-title/section-title.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SectionTitleComponent,
    SvgIconComponent,
    TranslateModule,
  ]
})
export class AboutMeComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private currentYearService: CurrentYearService,
    private destroyRef: DestroyRef,
  ) {}

  protected currentYear = new Date().getFullYear();

  private getCurrentYear$ = this.currentYearService.getCurrentYear()
    .pipe(takeUntilDestroyed(this.destroyRef));

  ngOnInit() {
    this.fetchCurrentYear();
  }

  private fetchCurrentYear(): void {
    this.getCurrentYear$.subscribe(currentYear => {
      this.currentYear = currentYear;
      this.cdr.markForCheck();
    });
  }
}

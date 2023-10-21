import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    TranslateModule,
  ]
})
export class AboutMeComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private currentYearService: CurrentYearService,
  ) {}

  protected currentYear = new Date().getFullYear();

  ngOnInit() {
    this.currentYearService.getCurrentYear().subscribe(currentYear => {
      this.currentYear = currentYear;
      this.cdr.markForCheck();
    });
  }
}

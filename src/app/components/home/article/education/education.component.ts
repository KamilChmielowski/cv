import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { SectionTitleComponent } from '../../section-title/section-title.component';
import { TimelineItemComponent } from '../../timeline-item/timeline-item.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SectionTitleComponent,
    TimelineItemComponent,
    TranslateModule,
  ],
})
export class EducationComponent {}

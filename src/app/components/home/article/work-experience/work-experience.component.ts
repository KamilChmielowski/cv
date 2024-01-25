import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { SectionTitleComponent } from '../../section-title/section-title.component';
import { TimelineItemComponent } from '../../timeline-item/timeline-item.component';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SectionTitleComponent,
    TimelineItemComponent,
    TranslateModule,
  ]
})
export class WorkExperienceComponent {}

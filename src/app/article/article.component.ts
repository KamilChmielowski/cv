import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AboutMeComponent } from './about-me/about-me.component';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AboutMeComponent,
    SectionTitleComponent,
    WorkExperienceComponent,
  ]
})
export class ArticleComponent {}

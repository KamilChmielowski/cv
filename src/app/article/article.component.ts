import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SectionTitleComponent } from '../section-title/section-title.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SectionTitleComponent,
  ]
})
export class ArticleComponent {}

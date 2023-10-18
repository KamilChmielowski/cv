import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SectionTitleComponent } from '../../section-title/section-title.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SectionTitleComponent,
  ]
})
export class AboutMeComponent {}

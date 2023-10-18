import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SectionTitleComponent } from '../section-title/section-title.component';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SectionTitleComponent
  ]
})
export class AsideComponent {}

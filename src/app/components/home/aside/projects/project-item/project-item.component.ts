import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { ItemChipsComponent } from './item-chips/item-chips.component';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ItemChipsComponent,
    SvgIconComponent,
    TranslateModule,
  ]
})
export class ProjectItemComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) href = '';
  @Input() chips?: string[];
  @Input() githubUrl?: string;
  @Input() jasmineUrl?: string;
}

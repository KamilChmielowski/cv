import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemChipsComponent } from './item-chips/item-chips.component';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ItemChipsComponent,
  ]
})
export class ProjectItemComponent {
  @Input() title = '';
  @Input() href = '';
  @Input() chips?: string[];
}

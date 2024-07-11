import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemComponent {
  @Input({ required: true }) chip = ''
  @Input({ required: true }) date = ''
  @Input({ required: true }) header = ''
}

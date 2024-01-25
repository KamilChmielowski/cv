import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-chips',
  templateUrl: './item-chips.component.html',
  styleUrls: ['./item-chips.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ]
})
export class ItemChipsComponent {
  @Input() chips?: string[] | undefined;
}

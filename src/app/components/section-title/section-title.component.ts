import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SectionTitleImports } from './section-title.imports';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleImports.imports],
})
export class SectionTitleComponent {
  @Input({ required: true }) icon: string = '';
  @Input({ required: true }) title: string = '';
}

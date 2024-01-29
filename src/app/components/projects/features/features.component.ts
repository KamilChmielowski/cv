import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { ArrayPipe } from './array.pipe';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ArrayPipe,
    CommonModule,
    TranslateModule,
  ],
})
export class FeaturesComponent {
  @Input({ required: true }) key!: string;
  @Input({ required: true }) count!: number;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProgressBarComponent,
  ]
})
export class TechStackComponent {}

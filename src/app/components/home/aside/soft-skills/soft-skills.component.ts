import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { ChipComponent } from './chip/chip.component';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChipComponent,
    TranslateModule,
  ]
})
export class SoftSkillsComponent {
  readonly chipTranslations = [
    'project-management', 'leadership', 'team-working', 'communicativeness',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ChipComponent,
        TranslateModule,
    ]
})
export class SoftSkillsComponent {}

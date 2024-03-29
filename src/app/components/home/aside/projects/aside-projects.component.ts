import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { environment } from '../../../../../environments/environment';
import { ProjectItemComponent } from './project-item/project-item.component';

@Component({
  selector: 'app-aside-projects',
  templateUrl: './aside-projects.component.html',
  styleUrls: ['./aside-projects.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ProjectItemComponent,
    TranslateModule,
  ]
})
export class AsideProjectsComponent {
  protected readonly environment = environment;
}

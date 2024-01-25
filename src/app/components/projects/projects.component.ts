import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionTitleComponent } from '../home/section-title/section-title.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectItemComponent } from '../home/aside/projects/project-item/project-item.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    SectionTitleComponent,
    TranslateModule,
    ProjectItemComponent,
  ],
})
export class ProjectsComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { EducationComponent } from '../article/education/education.component';
import { LanguagesComponent } from './languages/languages.component';
import { ProjectsComponent } from './projects/projects.component';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { SoftSkillsComponent } from './soft-skills/soft-skills.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    EducationComponent,
    LanguagesComponent,
    ProjectsComponent,
    SectionTitleComponent,
    SoftSkillsComponent,
    TechStackComponent,
    TranslateModule,
  ]
})
export class AsideComponent {}

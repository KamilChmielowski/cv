import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

import { environment } from '../../../environments/environment';
import { GithubLanguages } from '../../services/github/github.model';
import { GithubService } from '../../services/github/github.service';
import { ProjectItemComponent } from '../home/aside/projects/project-item/project-item.component';
import { ProjectLangComponent } from './project-lang/project-lang.component';
import { SectionTitleComponent } from '../home/section-title/section-title.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ProjectItemComponent,
    ProjectLangComponent,
    RouterLink,
    SectionTitleComponent,
    TranslateModule,
  ],
})
export class ProjectsComponent implements OnInit {
  readonly languages = ['cv', 'weather'];
  protected readonly environment = environment;

  protected projectsLanguages: GithubLanguages[] = [];

  private getProjectLanguages$ = forkJoin(
    this.languages.map(project => this.githubService.getProjectLanguages(project)
      .pipe(takeUntilDestroyed(this.destroyRef))
    )
  );

  constructor(
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private githubService: GithubService,
  ) {}

  ngOnInit() {
    this.getProjectLanguages$.subscribe(projectsLanguages => {
      this.projectsLanguages = projectsLanguages;
      this.cdr.markForCheck()
    });
  }
}

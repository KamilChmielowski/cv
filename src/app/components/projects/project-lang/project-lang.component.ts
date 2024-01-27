import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubLanguages } from '../../../services/github/github.model';

@Component({
  selector: 'app-project-lang',
  templateUrl: './project-lang.component.html',
  styleUrls: ['./project-lang.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ProjectLangComponent {
  @Input({ required: true }) set languages(value: GithubLanguages) {
    this._languages = value;
    this.langSum = +Object.values(value).reduce((v1, v2) => v1 + v2);
  };

  get languages(): GithubLanguages {
    return this._languages;
  }

  protected langSum!: number;
  private _languages!: GithubLanguages;

  protected compare(v1: any, v2: any): number {
    return +v1.value < +v2.value ? 1 : -1;
  }
}

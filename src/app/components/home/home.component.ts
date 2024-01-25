import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ArticleComponent } from './article/article.component';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArticleComponent,
    AsideComponent,
    HeaderComponent,
  ]
})
export class HomeComponent {}

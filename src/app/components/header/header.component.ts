import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HeaderImports } from './header.imports';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderImports.imports,
    NavComponent
  ],
})
export class HeaderComponent {
  protected readonly environment = environment;
  protected readonly location = location;
}

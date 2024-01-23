import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HeaderImports } from './header.imports';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: HeaderImports.imports,
})
export class HeaderComponent {
  protected readonly environment = environment;
  protected readonly location = location;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageBarComponent {
  @Input({ required: true }) value = '0';
}

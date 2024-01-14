import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';

import { CopyTextImports } from './copy-text.imports';

@Component({
  selector: 'app-copy-text',
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: CopyTextImports.imports,
})
export class CopyTextComponent {
  @Input({ required: true }) aria = '';
  @Input() copyText = '';
  @Input({ required: true }) text = '';

  @HostBinding('class.tooltip-visible') private tooltipVisible = false;

  constructor(private cdr: ChangeDetectorRef) {}

  showTooltip(): void {
    if (!this.tooltipVisible) {
      this.tooltipVisible = true;
      setTimeout(() => {
        this.tooltipVisible = false;
        this.cdr.markForCheck();
      }, 2000);
    }
  }
}

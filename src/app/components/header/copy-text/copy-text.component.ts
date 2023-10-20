import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copy-text',
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ClipboardModule,
  ]
})
export class CopyTextComponent {
  @Input() copyText? = '';
  @Input() text = '';

  @HostBinding('class.tooltip-visible') private tooltipVisible = false;

  constructor(private cdr: ChangeDetectorRef) {}

  protected showTooltip(): void {
    if (!this.tooltipVisible) {
      this.tooltipVisible = true;
      setTimeout(() => {
        this.tooltipVisible = false;
        this.cdr.markForCheck();
      }, 2000);
    }
  }
}

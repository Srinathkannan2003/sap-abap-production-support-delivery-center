import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sap-page-title',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <header class="page-header">
      <div>
        <span class="eyebrow">{{ eyebrow }}</span>
        <h1>{{ title }}</h1>
        <p>{{ summary }}</p>
      </div>
      @if (actionLabel) {
        <button mat-flat-button color="primary">
          <mat-icon>{{ actionIcon }}</mat-icon>
          {{ actionLabel }}
        </button>
      }
    </header>
  `,
  styles: [`h1 { font-size: clamp(26px, 3vw, 38px); } p { max-width: 880px; margin: 8px 0 0; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) eyebrow = '';
  @Input({ required: true }) summary = '';
  @Input() actionLabel = '';
  @Input() actionIcon = 'add';
}

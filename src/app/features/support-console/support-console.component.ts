import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="Operations" title="Production Support Console" summary="Short dumps, queue failures, interface failures, job failures, RCA, fix recommendation, and resolution runbooks." />
      <div class="grid">
        @for (event of data.supportEvents$ | async; track event.object) {
          <article class="panel">
            <span class="eyebrow">{{ event.type }}</span>
            <h2>{{ event.object }}</h2>
            <p><strong>Impact:</strong> {{ event.impact }}</p>
            <p><strong>RCA:</strong> {{ event.rca }}</p>
            <p><strong>Fix:</strong> {{ event.recommendation }}</p>
            <ol>@for (step of event.steps; track step) { <li>{{ step }}</li> }</ol>
          </article>
        }
      </div>
    </section>
  `,
  styles: [`h2 { font-size: 20px; } ol { margin: 0; padding-left: 20px; color: #31465d; line-height: 1.6; } strong { color: var(--sap-text); }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportConsoleComponent {
  constructor(readonly data: PortfolioDataService) {}
}

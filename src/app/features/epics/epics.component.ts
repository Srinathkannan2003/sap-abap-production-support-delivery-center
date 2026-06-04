import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="Agile Delivery" title="Epic Delivery Management" summary="Epic planning, user story sizing, sprint progress, estimated versus actual effort, and UAT readiness for SAP delivery work." />
      <div class="grid">
        @for (epic of data.epics$ | async; track epic.id) {
          <article class="panel">
            <span class="eyebrow">{{ epic.id }} · {{ epic.complexity }}</span>
            <h2>{{ epic.description }}</h2>
            <div class="metrics"><span>{{ epic.stories }} stories</span><span>{{ epic.storyPoints }} points</span><span>{{ epic.estimatedEffort }}h est</span><span>{{ epic.actualEffort }}h actual</span></div>
            <p><span class="status" [class.good]="epic.status === 'Done'" [class.warn]="epic.status === 'UAT'">{{ epic.status }}</span></p>
          </article>
        }
      </div>
    </section>
  `,
  styles: [`.panel { display: grid; gap: 12px; } h2 { font-size: 19px; } .metrics { display: flex; gap: 10px; flex-wrap: wrap; } .metrics span { border: 1px solid var(--sap-line); border-radius: 6px; padding: 7px 9px; background: #f7f9fb; font-weight: 700; color: #31465d; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpicsComponent {
  constructor(readonly data: PortfolioDataService) {}
}

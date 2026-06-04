import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="SE80 / ADT" title="ABAP Development Repository" summary="Mock ABAP repository with reports, enhancements, BADI implementation, SmartForm driver, and ALV examples." />
      <div class="grid">
        @for (object of data.repositoryObjects$ | async; track object.name) {
          <article class="panel">
            <span class="eyebrow">{{ object.type }} · {{ object.owner }}</span>
            <h2>{{ object.name }}</h2>
            <p>{{ object.description }}</p>
            <pre class="code"><code>{{ object.code }}</code></pre>
          </article>
        }
      </div>
    </section>
  `,
  styles: [`h2 { font-size: 18px; } .panel { display: grid; gap: 12px; align-content: start; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbapRepositoryComponent {
  constructor(readonly data: PortfolioDataService) {}
}

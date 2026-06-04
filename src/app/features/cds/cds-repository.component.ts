import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="ABAP Core Data Services" title="CDS View Repository" summary="Interface CDS objects with annotations, associations, and OData exposure patterns for analytics and transactional support." />
      @for (cds of data.cdsObjects$ | async; track cds.name) {
        <article class="panel">
          <div class="split">
            <div>
              <span class="eyebrow">{{ cds.name }}</span>
              <h2>{{ cds.purpose }}</h2>
              <h3>Annotations</h3>
              <ul>@for (annotation of cds.annotations; track annotation) { <li>{{ annotation }}</li> }</ul>
              <h3>Relationships</h3>
              <ul>@for (relationship of cds.relationships; track relationship) { <li>{{ relationship }}</li> }</ul>
            </div>
            <pre class="code"><code>{{ cds.syntax }}</code></pre>
          </div>
        </article>
      }
    </section>
  `,
  styles: [`.split { display: grid; grid-template-columns: minmax(240px, .8fr) minmax(280px, 1.2fr); gap: 16px; } h2 { font-size: 20px; margin: 6px 0 18px; } h3 { font-size: 14px; margin: 14px 0 4px; } @media(max-width: 900px){ .split { grid-template-columns: 1fr; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdsRepositoryComponent {
  constructor(readonly data: PortfolioDataService) {}
}

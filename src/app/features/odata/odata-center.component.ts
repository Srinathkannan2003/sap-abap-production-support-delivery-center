import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="SAP Gateway" title="OData Service Center" summary="Service metadata, entity sets, CRUD endpoints, and the CDS-to-OData integration story used by SAP Fiori applications." />
      <section class="panel">
        <h2>CDS and OData Integration</h2>
        <p>ABAP CDS models project reusable business semantics. Gateway exposes those views through service registration, generated metadata, entity sets, and CRUD endpoints consumed by Fiori/UI clients. In S/4HANA, annotated CDS views can be published directly or wrapped by service binding for governed release.</p>
      </section>
      <div class="grid">
        @for (service of data.odataServices$ | async; track service.name) {
          <article class="panel">
            <span class="eyebrow">{{ service.name }}</span>
            <p>{{ service.metadata }}</p>
            <h3>Entity Sets</h3>
            <div class="chips">@for (set of service.entitySets; track set) { <span>{{ set }}</span> }</div>
            <h3>CRUD Endpoints</h3>
            <pre class="code"><code>{{ service.endpoints.join('\n') }}</code></pre>
          </article>
        }
      </div>
    </section>
  `,
  styles: [`h2 { font-size: 20px; } h3 { font-size: 14px; margin: 14px 0 8px; } .chips { display: flex; flex-wrap: wrap; gap: 8px; } .chips span { border-radius: 999px; padding: 6px 10px; background: #eaf3ff; color: var(--sap-blue-dark); font-weight: 700; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ODataCenterComponent {
  constructor(readonly data: PortfolioDataService) {}
}

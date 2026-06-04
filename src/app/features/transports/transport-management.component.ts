import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="CTS+" title="Transport Management" summary="Transport creation, release, import tracking, and DEV-QA-UAT-PROD landscape governance." />
      <div class="landscape">
        @for (system of ['DEV', 'QA', 'UAT', 'PROD']; track system) { <div class="system">{{ system }}</div> }
      </div>
      <div class="table-wrap">
        <table><thead><tr><th>Transport</th><th>Description</th><th>Owner</th><th>Current Landscape</th><th>Status</th></tr></thead>
        <tbody>@for (transport of data.transports$ | async; track transport.id) { <tr><td>{{ transport.id }}</td><td>{{ transport.description }}</td><td>{{ transport.owner }}</td><td>{{ transport.landscape }}</td><td><span class="status" [class.good]="transport.status === 'Imported'" [class.bad]="transport.status === 'Failed'" [class.warn]="transport.status === 'Released'">{{ transport.status }}</span></td></tr> }</tbody></table>
      </div>
    </section>
  `,
  styles: [`.landscape { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; } .system { min-height: 76px; display: grid; place-items: center; border-radius: 8px; border: 1px solid var(--sap-line); background: #fff; font-weight: 800; color: var(--sap-blue-dark); } @media(max-width: 760px){ .landscape { grid-template-columns: repeat(2, 1fr); } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransportManagementComponent {
  constructor(readonly data: PortfolioDataService) {}
}

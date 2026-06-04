import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="Validation" title="UAT Management" summary="Business test cases, execution status, defect logging, retest control, and sign-off readiness for SAP changes." />
      <div class="table-wrap">
        <table><thead><tr><th>Test Case</th><th>Scenario</th><th>Owner</th><th>Status</th><th>Defect</th></tr></thead>
        <tbody>@for (test of data.uatCases$ | async; track test.id) { <tr><td>{{ test.id }}</td><td>{{ test.scenario }}</td><td>{{ test.owner }}</td><td><span class="status" [class.good]="test.status === 'Passed'" [class.bad]="test.status === 'Failed'" [class.warn]="test.status === 'Blocked'">{{ test.status }}</span></td><td>{{ test.defect || '-' }}</td></tr> }</tbody></table>
      </div>
      <section class="panel"><h2>Sign-off Workflow</h2><p>Prepare test evidence, review defects by priority, confirm transport import status, obtain SME approval, and attach signed UAT summary before production release.</p></section>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UatManagementComponent {
  constructor(readonly data: PortfolioDataService) {}
}

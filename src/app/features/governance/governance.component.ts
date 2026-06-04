import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="Technical Lead View" title="Team Governance" summary="Workload distribution, ticket ownership, team capacity, escalations, and SLA breach tracking for production support leadership." />
      <div class="table-wrap">
        <table><thead><tr><th>Name</th><th>Role</th><th>Capacity</th><th>Tickets</th><th>Escalations</th><th>SLA Breaches</th></tr></thead>
        <tbody>@for (member of data.teamMembers$ | async; track member.name) { <tr><td>{{ member.name }}</td><td>{{ member.role }}</td><td>{{ member.capacity }}%</td><td>{{ member.tickets }}</td><td>{{ member.escalations }}</td><td><span class="status" [class.good]="member.slaBreaches === 0" [class.bad]="member.slaBreaches > 0">{{ member.slaBreaches }}</span></td></tr> }</tbody></table>
      </div>
      <section class="panel"><h2>Governance Controls</h2><p>Daily triage, priority review, SLA breach prevention, transport freeze checks, peer review enforcement, ATC compliance, and production release sign-off are represented as lead-level operating controls.</p></section>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GovernanceComponent {
  constructor(readonly data: PortfolioDataService) {}
}

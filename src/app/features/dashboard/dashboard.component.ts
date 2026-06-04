import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { ChartCardComponent } from '../../shared/chart-card.component';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, ChartCardComponent, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="Command Center" title="SAP Production Support Dashboard" summary="One operational cockpit for incidents, RITMs, epics, UAT, transports, CDS/OData health, and ticket aging." />
      @if (data.dashboard$ | async; as dash) {
        <div class="kpis">
          <div class="panel"><span>Incidents</span><strong>{{ dash.incidentCount }}</strong><small>{{ dash.openIncidents }} active</small></div>
          <div class="panel"><span>Open RITMs</span><strong>{{ dash.openRitms }}</strong><small>approval and delivery</small></div>
          <div class="panel"><span>Open Epics</span><strong>{{ dash.openEpics }}</strong><small>agile delivery</small></div>
          <div class="panel"><span>SLA Compliance</span><strong>{{ dash.slaCompliance }}%</strong><small>rolling 30 days</small></div>
          <div class="panel"><span>UAT Status</span><strong>{{ dash.uatStatus }}</strong><small>execution progress</small></div>
          <div class="panel"><span>Transports</span><strong>{{ dash.transportStatus }}</strong><small>DEV to PROD</small></div>
          <div class="panel"><span>CDS/OData Health</span><strong>{{ dash.serviceHealth }}</strong><small>service availability</small></div>
          <div class="panel"><span>Aged Tickets</span><strong>{{ dash.agedTickets }}</strong><small>needs lead review</small></div>
        </div>
      }
      <div class="grid charts">
        <sap-chart-card title="Incidents by Priority" [config]="priorityChart" />
        <sap-chart-card title="Incidents by Module" [config]="moduleChart" />
        <sap-chart-card title="SLA Trend" [config]="slaChart" />
        <sap-chart-card title="UAT Progress" [config]="uatChart" />
        <sap-chart-card title="Epic Completion" [config]="epicChart" />
      </div>
    </section>
  `,
  styles: [`
    .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
    .kpis .panel { display: grid; gap: 5px; min-height: 118px; }
    .kpis span { color: var(--sap-muted); font-weight: 700; font-size: 13px; }
    .kpis strong { color: var(--sap-blue-dark); font-size: 30px; line-height: 1; }
    .kpis small { color: #5d6f82; }
    .charts { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  readonly priorityChart: ChartConfiguration = this.bar(['P1', 'P2', 'P3', 'P4'], [1, 2, 1, 0], '#0a6ed1');
  readonly moduleChart: ChartConfiguration = this.doughnut(['SD', 'MM', 'FI', 'CRM'], [1, 1, 1, 1]);
  readonly slaChart: ChartConfiguration = this.line(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], [91, 92, 95, 94, 96], '#2e7d32');
  readonly uatChart: ChartConfiguration = this.bar(['Passed', 'Failed', 'Blocked', 'Not Started'], [1, 1, 1, 1], '#6c8ebf');
  readonly epicChart: ChartConfiguration = this.bar(['Discovery', 'Build', 'UAT', 'Done'], [0, 1, 1, 1], '#00a884');

  constructor(readonly data: PortfolioDataService) {}

  private bar(labels: string[], values: number[], color: string): ChartConfiguration {
    return { type: 'bar', data: { labels, datasets: [{ data: values, backgroundColor: color }] }, options: { responsive: true, plugins: { legend: { display: false } } } };
  }

  private line(labels: string[], values: number[], color: string): ChartConfiguration {
    return { type: 'line', data: { labels, datasets: [{ data: values, borderColor: color, backgroundColor: `${color}22`, fill: true, tension: .35 }] }, options: { responsive: true } };
  }

  private doughnut(labels: string[], values: number[]): ChartConfiguration {
    return { type: 'doughnut', data: { labels, datasets: [{ data: values, backgroundColor: ['#0a6ed1', '#2e7d32', '#b45f06', '#6c8ebf'] }] }, options: { responsive: true } };
  }
}

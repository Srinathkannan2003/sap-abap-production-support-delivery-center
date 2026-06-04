import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="Interview Pack" title="Resume Assets" summary="Resume-ready positioning, Mermaid diagrams, screenshots checklist, and STAR talking points for SAP ABAP production support interviews." />
      <section class="panel">
        <h2>Project Description</h2>
        <p>Built an enterprise SAP ABAP Production Support & Delivery Center simulating ServiceNow incidents, RITMs, agile epics, UAT, CTS transports, ABAP repository governance, CDS views, OData service exposure, and production support triage using Angular, Material, RxJS, Chart.js, Express, and mock JWT authentication.</p>
      </section>
      <section class="panel">
        <h2>Architecture Mermaid</h2>
        <pre class="code"><code>{{ architectureDiagram }}</code></pre>
      </section>
      <section class="panel">
        <h2>Process Flow Mermaid</h2>
        <pre class="code"><code>{{ processDiagram }}</code></pre>
      </section>
      <section class="panel">
        <h2>Screenshots Checklist</h2>
        <ul><li>Dashboard KPI cockpit</li><li>Incident creation and SLA table</li><li>ABAP source repository</li><li>CDS annotations and associations</li><li>OData service metadata</li><li>Production support RCA console</li><li>UAT and transport tracking</li></ul>
      </section>
      <section class="panel">
        <h2>STAR Talking Points</h2>
        <p><strong>Situation:</strong> Production teams need a single view of incidents, enhancements, UAT, and release risk.</p>
        <p><strong>Task:</strong> Design a portfolio system showing ABAP delivery ownership across support and project work.</p>
        <p><strong>Action:</strong> Created modular Angular screens, mock JWT, SAP domain data, ABAP/CDS/OData repositories, dashboards, and runbooks.</p>
        <p><strong>Result:</strong> Demonstrates end-to-end SAP technical leadership, production support maturity, and interview-ready delivery communication.</p>
      </section>
    </section>
  `,
  styles: [`h2 { font-size: 20px; } ul { line-height: 1.7; color: #31465d; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeAssetsComponent {
  readonly architectureDiagram = `flowchart LR\n  UI[Angular 20 Fiori-inspired UI] --> Core[Core Services Auth/Data]\n  Core --> RxJS[RxJS State Streams]\n  UI --> Modules[Lazy Feature Modules]\n  Modules --> API[Express Mock API]\n  API --> DB[(JSON Seed Data)]\n  Modules --> Docs[Portfolio Docs]`;
  readonly processDiagram = `flowchart TD\n  INC[Incident/RITM Intake] --> TRIAGE[Priority and SLA Triage]\n  TRIAGE --> RCA[ABAP RCA and Technical Assessment]\n  RCA --> BUILD[ABAP/CDS/OData Build]\n  BUILD --> UAT[UAT Execution]\n  UAT --> TR[Transport Release]\n  TR --> PROD[Production Import]\n  PROD --> CLOSE[Closure Notes and Governance]`;
}

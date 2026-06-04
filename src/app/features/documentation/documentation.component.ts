import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="Knowledge Base" title="Documentation Module" summary="Project documentation pack generated under docs/ for architecture, functional and technical specs, UAT, testing, guides, and deployment." />
      <div class="grid">
        @for (doc of docs; track doc.file) {
          <article class="panel"><span class="eyebrow">{{ doc.type }}</span><h2>{{ doc.file }}</h2><p>{{ doc.summary }}</p></article>
        }
      </div>
    </section>
  `,
  styles: [`h2 { font-size: 18px; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent {
  readonly docs = [
    { file: 'Architecture.md', type: 'Architecture', summary: 'Layering, modules, route boundaries, data flow, security, deployment topology.' },
    { file: 'FunctionalSpecification.md', type: 'Functional', summary: 'Business capabilities for incident, RITM, epic, UAT, and support workflows.' },
    { file: 'TechnicalSpecification.md', type: 'Technical', summary: 'Angular, Express, mock JWT, mock persistence, and integration design.' },
    { file: 'UATPlan.md', type: 'UAT', summary: 'Entry criteria, execution workflow, defect triage, sign-off gates.' },
    { file: 'TestCases.md', type: 'Testing', summary: 'Representative scenarios for dashboard, tickets, CDS, OData, transports.' },
    { file: 'IncidentManagementGuide.md', type: 'Runbook', summary: 'Incident lifecycle, SLA handling, RCA notes, closure governance.' },
    { file: 'CDSViewsGuide.md', type: 'ABAP CDS', summary: 'CDS syntax, annotations, associations, and exposure strategy.' },
    { file: 'ODataGuide.md', type: 'Gateway', summary: 'Entity sets, metadata, CRUD endpoint examples, CDS integration.' },
    { file: 'DeploymentGuide.md', type: 'Deployment', summary: 'Local commands, GitHub Pages, and backend mock API notes.' }
  ];
}

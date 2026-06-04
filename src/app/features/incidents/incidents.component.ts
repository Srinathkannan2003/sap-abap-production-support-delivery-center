import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { Incident } from '../../core/models';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="ITSM" title="Incident Management" summary="Create, assign, prioritize, analyze root cause, track resolution, and monitor SLA for SAP production incidents." />
      <form class="panel form" [formGroup]="form" (ngSubmit)="create()">
        <mat-form-field><mat-label>Category</mat-label><input matInput formControlName="category"></mat-form-field>
        <mat-form-field><mat-label>SAP Module</mat-label><mat-select formControlName="module">@for (m of modules; track m) { <mat-option [value]="m">{{ m }}</mat-option> }</mat-select></mat-form-field>
        <mat-form-field><mat-label>Priority</mat-label><mat-select formControlName="priority">@for (p of priorities; track p) { <mat-option [value]="p">{{ p }}</mat-option> }</mat-select></mat-form-field>
        <mat-form-field><mat-label>Assigned To</mat-label><input matInput formControlName="assignedTo"></mat-form-field>
        <mat-form-field class="wide"><mat-label>Root Cause</mat-label><input matInput formControlName="rootCause"></mat-form-field>
        <mat-form-field class="wide"><mat-label>Resolution</mat-label><input matInput formControlName="resolution"></mat-form-field>
        <button mat-flat-button color="primary" type="submit">Create Incident</button>
      </form>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Incident ID</th><th>Category</th><th>SAP Module</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Root Cause</th><th>Resolution</th><th>Created</th><th>Closed</th></tr></thead>
          <tbody>
            @for (incident of data.incidents$ | async; track incident.id) {
              <tr>
                <td>{{ incident.id }}</td><td>{{ incident.category }}</td><td>{{ incident.module }}</td>
                <td><span class="priority" [class.p1]="incident.priority === 'P1'" [class.p2]="incident.priority === 'P2'" [class.p3]="incident.priority === 'P3'">{{ incident.priority }}</span></td>
                <td><span class="status" [class.good]="incident.status === 'Resolved' || incident.status === 'Closed'" [class.warn]="incident.status === 'Waiting'">{{ incident.status }}</span></td>
                <td>{{ incident.assignedTo }}</td><td>{{ incident.rootCause }}</td><td>{{ incident.resolution }}</td><td>{{ incident.createdDate }}</td><td>{{ incident.closedDate || '-' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`.form { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; align-items: start; } .wide { grid-column: span 2; } button { min-height: 48px; } @media(max-width: 760px){ .wide { grid-column: auto; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncidentsComponent {
  private readonly fb = inject(FormBuilder);
  readonly modules = ['SD', 'MM', 'FI', 'CRM', 'BW', 'Basis'];
  readonly priorities = ['P1', 'P2', 'P3', 'P4'];
  readonly form = this.fb.nonNullable.group({
    category: ['Pricing', Validators.required],
    module: ['SD' as Incident['module'], Validators.required],
    priority: ['P2' as Incident['priority'], Validators.required],
    assignedTo: ['Srinath ABAP', Validators.required],
    rootCause: ['Functional configuration and ABAP enhancement mismatch', Validators.required],
    resolution: ['Analyze logs, patch object, validate in QA, and update closure notes', Validators.required]
  });

  constructor(readonly data: PortfolioDataService) {}

  create(): void {
    if (this.form.invalid) return;
    this.data.createIncident({ id: `INC${Math.floor(1000000 + Math.random() * 9000000)}`, status: 'Open', createdDate: new Date().toISOString().slice(0, 10), slaHours: 8, ...this.form.getRawValue() });
  }
}

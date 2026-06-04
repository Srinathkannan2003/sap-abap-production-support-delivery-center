import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Ritm } from '../../core/models';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PageTitleComponent } from '../../shared/page-title.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, PageTitleComponent],
  template: `
    <section class="page">
      <sap-page-title eyebrow="ServiceNow Simulation" title="Service Request Management" summary="RITM intake for access, enhancements, data correction, interface change, and configuration requests with approval and delivery tracking." />
      <form class="panel form" [formGroup]="form" (ngSubmit)="create()">
        <mat-form-field><mat-label>Type</mat-label><mat-select formControlName="type">@for (type of types; track type) { <mat-option [value]="type">{{ type }}</mat-option> }</mat-select></mat-form-field>
        <mat-form-field><mat-label>Requester</mat-label><input matInput formControlName="requester"></mat-form-field>
        <mat-form-field><mat-label>Approval</mat-label><mat-select formControlName="approvalStatus"><mat-option value="Pending">Pending</mat-option><mat-option value="Approved">Approved</mat-option><mat-option value="Rejected">Rejected</mat-option></mat-select></mat-form-field>
        <mat-form-field><mat-label>Technical Assessment</mat-label><input matInput formControlName="technicalAssessment"></mat-form-field>
        <mat-form-field><mat-label>Delivery Status</mat-label><input matInput formControlName="deliveryStatus"></mat-form-field>
        <button mat-flat-button color="primary" type="submit">Create Request</button>
      </form>
      <div class="table-wrap">
        <table><thead><tr><th>RITM</th><th>Type</th><th>Requester</th><th>Approval</th><th>Technical Assessment</th><th>Delivery</th></tr></thead>
        <tbody>@for (ritm of data.ritms$ | async; track ritm.id) { <tr><td>{{ ritm.id }}</td><td>{{ ritm.type }}</td><td>{{ ritm.requester }}</td><td><span class="status" [class.good]="ritm.approvalStatus === 'Approved'" [class.bad]="ritm.approvalStatus === 'Rejected'">{{ ritm.approvalStatus }}</span></td><td>{{ ritm.technicalAssessment }}</td><td>{{ ritm.deliveryStatus }}</td></tr> }</tbody></table>
      </div>
    </section>
  `,
  styles: [`.form { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; align-items: start; } button { min-height: 48px; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RitmsComponent {
  private readonly fb = inject(FormBuilder);
  readonly types: Ritm['type'][] = ['User Access', 'Report Enhancement', 'Data Correction', 'Interface Change', 'Configuration Request'];
  readonly form = this.fb.nonNullable.group({
    type: ['Report Enhancement' as Ritm['type'], Validators.required],
    requester: ['Business Operations', Validators.required],
    approvalStatus: ['Pending' as Ritm['approvalStatus'], Validators.required],
    technicalAssessment: ['Impact analysis, object list, estimates, and test scope prepared', Validators.required],
    deliveryStatus: ['Assessment in progress', Validators.required]
  });

  constructor(readonly data: PortfolioDataService) {}

  create(): void {
    if (this.form.invalid) return;
    this.data.createRitm({ id: `RITM${Math.floor(100000 + Math.random() * 900000)}`, ...this.form.getRawValue() });
  }
}

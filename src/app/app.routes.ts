import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'incidents', loadComponent: () => import('./features/incidents/incidents.component').then(m => m.IncidentsComponent) },
      { path: 'ritms', loadComponent: () => import('./features/ritms/ritms.component').then(m => m.RitmsComponent) },
      { path: 'epics', loadComponent: () => import('./features/epics/epics.component').then(m => m.EpicsComponent) },
      { path: 'abap', loadComponent: () => import('./features/abap/abap-repository.component').then(m => m.AbapRepositoryComponent) },
      { path: 'cds', loadComponent: () => import('./features/cds/cds-repository.component').then(m => m.CdsRepositoryComponent) },
      { path: 'odata', loadComponent: () => import('./features/odata/odata-center.component').then(m => m.ODataCenterComponent) },
      { path: 'uat', loadComponent: () => import('./features/uat/uat-management.component').then(m => m.UatManagementComponent) },
      { path: 'transports', loadComponent: () => import('./features/transports/transport-management.component').then(m => m.TransportManagementComponent) },
      { path: 'support-console', loadComponent: () => import('./features/support-console/support-console.component').then(m => m.SupportConsoleComponent) },
      { path: 'governance', loadComponent: () => import('./features/governance/governance.component').then(m => m.GovernanceComponent) },
      { path: 'documentation', loadComponent: () => import('./features/documentation/documentation.component').then(m => m.DocumentationComponent) },
      { path: 'resume-assets', loadComponent: () => import('./features/resume-assets/resume-assets.component').then(m => m.ResumeAssetsComponent) }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

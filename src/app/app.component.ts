import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './core/auth/auth.service';
import { navItems } from './core/navigation';

@Component({
  selector: 'sap-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule],
  template: `
    <mat-sidenav-container class="shell">
      <mat-sidenav mode="side" opened class="nav">
        <div class="brand">
          <span class="mark">SAP</span>
          <div>
            <strong>ABAP Delivery Center</strong>
            <small>Production Support Cockpit</small>
          </div>
        </div>
        <nav>
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path" routerLinkActive="active">
              <mat-icon>{{ item.icon }}</mat-icon>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar class="topbar">
          <div>
            <span class="eyebrow">Luxoft-style SAP ABAP portfolio simulation</span>
            <h2>Production Support & Delivery Center</h2>
          </div>
          <button mat-flat-button color="primary" (click)="auth.login('demo.abap', 'portfolio')">
            <mat-icon>verified_user</mat-icon>
            Mock Login
          </button>
        </mat-toolbar>
        <main>
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .shell { min-height: 100vh; }
    .nav { width: 282px; border-right: 1px solid var(--sap-line); background: #fff; }
    .brand { display: flex; gap: 12px; align-items: center; padding: 20px; border-bottom: 1px solid var(--sap-line); }
    .brand small { display: block; color: var(--sap-muted); margin-top: 3px; }
    .mark { display: grid; place-items: center; width: 48px; height: 36px; border-radius: 6px; color: #fff; background: var(--sap-blue); font-weight: 800; }
    nav { padding: 10px; display: grid; gap: 4px; }
    nav a { display: flex; align-items: center; gap: 12px; min-height: 42px; padding: 0 12px; border-radius: 6px; color: #31465d; font-weight: 600; }
    nav a.active, nav a:hover { color: var(--sap-blue-dark); background: #eaf3ff; }
    .topbar { height: auto; min-height: 76px; padding: 14px 24px; justify-content: space-between; border-bottom: 1px solid var(--sap-line); background: #fff; }
    .topbar h2 { font-size: 20px; margin-top: 4px; }
    main { padding: 24px; max-width: 1480px; }
    @media (max-width: 980px) {
      .nav { width: 82px; }
      .brand div, nav span { display: none; }
      .brand { justify-content: center; padding: 16px 10px; }
      nav a { justify-content: center; padding: 0; }
    }
    @media (max-width: 720px) {
      .topbar { align-items: flex-start; gap: 12px; }
      main { padding: 16px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly navItems = navItems;
  constructor(readonly auth: AuthService) {}
}

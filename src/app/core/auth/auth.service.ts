import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<string | null>(localStorage.getItem('sap_user'));

  login(username: string, password: string): void {
    const token = btoa(JSON.stringify({ sub: username, role: 'SAP_ABAP_DEVELOPER', exp: Date.now() + 86_400_000, password }));
    localStorage.setItem('sap_token', token);
    localStorage.setItem('sap_user', username);
    this.user.set(username);
  }

  logout(): void {
    localStorage.removeItem('sap_token');
    localStorage.removeItem('sap_user');
    this.user.set(null);
  }

  get token(): string | null {
    return localStorage.getItem('sap_token');
  }

  get isAuthenticated(): boolean {
    return Boolean(this.token);
  }
}

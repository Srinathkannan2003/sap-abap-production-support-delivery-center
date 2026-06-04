import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateChildFn = () => {
  const auth = inject(AuthService);
  if (!auth.isAuthenticated) {
    auth.login('demo.abap', 'portfolio');
  }
  return true;
};

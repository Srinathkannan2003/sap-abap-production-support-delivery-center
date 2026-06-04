# Technical Specification

Frontend: Angular 20 standalone components, Angular Material controls, RxJS `BehaviorSubject` state, Chart.js visualizations, SCSS theme tokens.

Backend: Express mock API with `/api/auth/login`, protected resource routes, JSON seed data, and JWT-compatible request flow.

Security: Mock JWT is suitable only for portfolio/demo use. Production would require identity provider integration, secure token storage, RBAC, CSRF strategy, and backend validation.

Deployment: Static Angular output is compatible with GitHub Pages. The Express API is optional for local API simulation.

# SAP ABAP Production Support & Delivery Center

Enterprise-style portfolio application simulating the daily work of an SAP ABAP developer in production support and delivery: incidents, RITMs, epics, UAT, transports, ABAP governance, CDS views, OData services, RCA, and team governance.

## Tech Stack

- Angular 20, TypeScript strict mode, Angular Material, RxJS
- Chart.js dashboards
- Node.js and Express mock API
- JSON seed database
- Mock JWT authentication
- SCSS with SAP Fiori-inspired styling
- GitHub Pages compatible frontend build

## Folder Structure

```text
src/app/core                 Auth, navigation, models, mock data, data service
src/app/shared               Reusable page title and chart card components
src/app/features/dashboard   KPI cockpit and Chart.js visualizations
src/app/features/incidents   Incident creation, RCA, SLA, resolution tracking
src/app/features/ritms       Service request approval and delivery tracking
src/app/features/epics       Agile epic and user story delivery management
src/app/features/abap        ABAP repository and source samples
src/app/features/cds         CDS view repository
src/app/features/odata       OData service center
src/app/features/uat         UAT execution and defect tracking
src/app/features/transports  DEV-QA-UAT-PROD transport flow
src/app/features/support-console Production support RCA runbooks
src/app/features/governance  Team workload and SLA governance
src/app/features/documentation Documentation index
src/app/features/resume-assets Resume and STAR interview assets
backend/                     Express API and JSON seed data
docs/                        Architecture, specifications, guides, deployment
```

## Run Locally

```bash
npm install
npm run api
npm start
```

Open `http://localhost:4200`. The Angular app auto-creates a mock portfolio login token. The backend runs on `http://localhost:3000`.

## Build

```bash
npm run build
```

## GitHub Pages Deployment

1. Create a GitHub repository named `sap-abap-production-support-delivery-center`.
2. Set the remote:

```bash
git remote add origin https://github.com/<your-user>/sap-abap-production-support-delivery-center.git
git branch -M main
git add .
git commit -m "Build SAP ABAP production support portfolio app"
git push -u origin main
```

3. Deploy frontend:

```bash
npm run deploy:gh-pages
```

4. In GitHub, enable Pages for the `gh-pages` branch.

## Portfolio Talking Points

- Demonstrates SAP production support triage, SLA handling, RCA, and closure governance.
- Shows ABAP repository literacy with reports, user exits, BADI, SmartForms, and ALV examples.
- Explains CDS annotations, associations, and OData service exposure.
- Connects Agile delivery, UAT, transports, and production release controls in one cockpit.

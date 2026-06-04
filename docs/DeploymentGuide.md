# Deployment Guide

Local:

```bash
npm install
npm run api
npm start
```

Production frontend:

```bash
npm run build
npm run deploy:gh-pages
```

Git:

```bash
git add .
git commit -m "Build SAP ABAP production support portfolio app"
git remote add origin https://github.com/<your-user>/sap-abap-production-support-delivery-center.git
git push -u origin main
```

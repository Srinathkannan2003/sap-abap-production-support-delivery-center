const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db.json');

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || 'sap-portfolio-secret';

app.use(cors());
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  const { username = 'demo.abap' } = req.body || {};
  const token = jwt.sign({ sub: username, role: 'SAP_ABAP_DEVELOPER' }, secret, { expiresIn: '8h' });
  res.json({ token, user: { username, role: 'SAP ABAP Developer', account: 'Luxoft portfolio simulation' } });
});

app.use('/api', (req, res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing mock JWT token' });
  next();
});

app.get('/api/dashboard', (_req, res) => {
  res.json({
    incidentCount: db.incidents.length,
    openRitms: db.ritms.filter((r) => r.deliveryStatus !== 'Complete').length,
    openEpics: db.epics.filter((e) => e.status !== 'Done').length,
    slaCompliance: 94,
    uatStatus: '68% Executed',
    transportStatus: '2 Waiting import',
    serviceHealth: '97.5%'
  });
});

for (const key of ['incidents', 'ritms', 'epics', 'repositoryObjects', 'cdsObjects', 'odataServices', 'uatCases', 'transports', 'supportEvents', 'teamMembers']) {
  app.get(`/api/${key}`, (_req, res) => res.json(db[key]));
  app.post(`/api/${key}`, (req, res) => {
    db[key].unshift(req.body);
    res.status(201).json(req.body);
  });
}

app.listen(port, () => {
  console.log(`SAP ABAP Production Support API running on http://localhost:${port}`);
});

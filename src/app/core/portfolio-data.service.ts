import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { cdsObjects, epics, incidents, odataServices, repositoryObjects, ritms, supportEvents, teamMembers, transports, uatCases } from './mock-data';
import { Incident, Ritm } from './models';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private readonly incidentsSubject = new BehaviorSubject(incidents);
  private readonly ritmsSubject = new BehaviorSubject(ritms);

  readonly incidents$ = this.incidentsSubject.asObservable();
  readonly ritms$ = this.ritmsSubject.asObservable();
  readonly epics$ = new BehaviorSubject(epics).asObservable();
  readonly repositoryObjects$ = new BehaviorSubject(repositoryObjects).asObservable();
  readonly cdsObjects$ = new BehaviorSubject(cdsObjects).asObservable();
  readonly odataServices$ = new BehaviorSubject(odataServices).asObservable();
  readonly uatCases$ = new BehaviorSubject(uatCases).asObservable();
  readonly transports$ = new BehaviorSubject(transports).asObservable();
  readonly supportEvents$ = new BehaviorSubject(supportEvents).asObservable();
  readonly teamMembers$ = new BehaviorSubject(teamMembers).asObservable();

  readonly dashboard$ = this.incidents$.pipe(
    map(items => {
      const open = items.filter(i => !['Resolved', 'Closed'].includes(i.status)).length;
      return {
        incidentCount: items.length,
        openIncidents: open,
        openRitms: ritms.filter(r => r.deliveryStatus !== 'Complete').length,
        openEpics: epics.filter(e => e.status !== 'Done').length,
        slaCompliance: 94,
        uatStatus: '68% Executed',
        transportStatus: '2 Waiting import',
        serviceHealth: '97.5%',
        agedTickets: items.filter(i => new Date(i.createdDate) < new Date('2026-05-29')).length
      };
    })
  );

  createIncident(incident: Incident): void {
    this.incidentsSubject.next([incident, ...this.incidentsSubject.value]);
  }

  createRitm(ritm: Ritm): void {
    this.ritmsSubject.next([ritm, ...this.ritmsSubject.value]);
  }
}

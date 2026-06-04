export type Priority = 'P1' | 'P2' | 'P3' | 'P4';
export type TicketStatus = 'Open' | 'In Progress' | 'Waiting' | 'Resolved' | 'Closed';

export interface Incident {
  id: string;
  category: string;
  module: 'SD' | 'MM' | 'FI' | 'CRM' | 'BW' | 'Basis';
  priority: Priority;
  status: TicketStatus;
  assignedTo: string;
  rootCause: string;
  resolution: string;
  createdDate: string;
  closedDate?: string;
  slaHours: number;
}

export interface Ritm {
  id: string;
  type: 'User Access' | 'Report Enhancement' | 'Data Correction' | 'Interface Change' | 'Configuration Request';
  requester: string;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  technicalAssessment: string;
  deliveryStatus: string;
}

export interface Epic {
  id: string;
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
  estimatedEffort: number;
  actualEffort: number;
  status: 'Discovery' | 'Build' | 'UAT' | 'Done';
  stories: number;
  storyPoints: number;
}

export interface RepositoryObject {
  name: string;
  type: string;
  description: string;
  owner: string;
  code: string;
}

export interface CdsObject {
  name: string;
  purpose: string;
  annotations: string[];
  relationships: string[];
  syntax: string;
}

export interface ODataService {
  name: string;
  entitySets: string[];
  metadata: string;
  endpoints: string[];
}

export interface UatCase {
  id: string;
  scenario: string;
  owner: string;
  status: 'Not Started' | 'Passed' | 'Failed' | 'Blocked';
  defect?: string;
}

export interface Transport {
  id: string;
  description: string;
  owner: string;
  landscape: 'DEV' | 'QA' | 'UAT' | 'PROD';
  status: 'Created' | 'Released' | 'Imported' | 'Failed';
}

export interface SupportEvent {
  type: 'Short Dump' | 'Queue Failure' | 'Interface Failure' | 'Job Failure';
  object: string;
  impact: string;
  rca: string;
  recommendation: string;
  steps: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  capacity: number;
  tickets: number;
  escalations: number;
  slaBreaches: number;
}

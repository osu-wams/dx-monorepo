export interface CachetIncident {
  id: number;
  name: string;
  message: string;
  duration: number;
  permalink: string;
  status: number;
  statusText: string;
  isResolved: boolean;
  updatedAt: string;
}

export interface CachetComponent {
  id: number;
  name: string;
  description: string;
  statusText: string;
  status: number;
  updatedAt: string;
  incidents: CachetIncident[];
}

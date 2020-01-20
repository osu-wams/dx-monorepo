import axios from 'axios';

export const getMasqueradeUser = (): Promise<any> => axios.get(`/api/masquerade`).then(d => d.data);
export const postMasqueradeUser = (masqueradeId?: string, masqueradeReason?: string): Promise<any> =>
  masqueradeId ? axios.post(`/api/masquerade`, { masqueradeId, masqueradeReason }) : axios.post(`/api/masquerade`);

import axios from 'axios';
import useAPICall from '../useAPICall';
import * as mocks from '../mocks/alerts';

export const mockAlerts = mocks;

export const getRaveAlerts = () => axios.get('/api/alerts').then(res => res.data);
export const getDxAlerts = () => axios.get('/api/alerts/dx').then(res => res.data);
export const useRaveAlerts = () =>
  useAPICall<Alert[]>({
    api: getRaveAlerts,
    dataTransform: (data: any) => data,
    initialState: [],
  });
export const useDxAlerts = () =>
  useAPICall<Alert[]>({
    api: getDxAlerts,
    dataTransform: (data: any) => data,
    initialState: [],
  });

export type Alert = {
  title: string;
  date: Date;
  content: string;
  type: string;
};

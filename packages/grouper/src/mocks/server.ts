import { setupServer } from 'msw/node';
import { Client } from '../index';
import { handlers } from './handlers';

export const GROUPER_CLIENT = new Client({
  host: 'host',
  username: 'test',
  password: 'test',
});

export const server = setupServer(...handlers);

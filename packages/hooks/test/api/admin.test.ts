import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getResetApiCache } from './../../src/api/admin';

const mock = new MockAdapter(axios);

describe('getResetApiCache', () => {
  it('performs the call', async () => {
    mock.onGet('/api/admin/reset-api-cache').replyOnce(200);
    const response = await getResetApiCache();
    expect(response.status).toBe(200);
  });

  it('handles an error', async () => {
    mock.onGet('/api/admin/reset-api-cache').replyOnce(500, '');
    await getResetApiCache().catch(err => {
      expect(err.message).toBe('Request failed with status code 500');
    });
  });
});

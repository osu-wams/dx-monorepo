import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getResetApiCache } from './../../src/api/admin';

const mock = new MockAdapter(axios);

describe('reset-api-cache', () => {
  it('gets gpa on successful return', async () => {
    mock.onGet('api/admin/reset-api-cache').replyOnce(200);
  });

  it('handles api error', async () => {
    mock.onGet('api/admin/reset-api-cache').replyOnce(500);
    await getResetApiCache().catch(err => expect(err.message).toEqual('Error while resetting api cache.'));
  });
});

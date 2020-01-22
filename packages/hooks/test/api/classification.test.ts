import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getClassification, mockClassification } from '../../src/api/classification';

const mock = new MockAdapter(axios);

describe('getClassification', () => {
  it('gets academic status on successful returns', async () => {
    mock.onGet('/api/user/classification').reply(200, mockClassification.data);
    const result = await getClassification();
    expect(result).toEqual(mockClassification.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/user/classification').reply(500);
    await getClassification().catch(err => expect(err.message).toEqual('Request failed with status code 500'));
  });
});

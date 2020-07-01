import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getTrainings, mockTrainings } from '../../src/api/trainings';

const mock = new MockAdapter(axios);

describe('getTrainings', () => {
  it('gets trainings on successful returns', async () => {
    mock.onGet('/api/trainings').reply(200, mockTrainings.data);
    const result = await getTrainings();
    expect(result).toEqual(mockTrainings.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/trainings').reply(500);
    await getTrainings().catch(err => expect(err.message).toEqual('Request failed with status code 500'));
  });
});

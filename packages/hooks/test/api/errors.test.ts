import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { postError, postAppMessageError } from '../../src/api/errors';

const mock = new MockAdapter(axios);

describe('postError', () => {
  it('returns successful', async () => {
    mock.onPost('/api/errors').reply(200);
    const result = await postError(new Error('test'));
    expect(result).toBeUndefined();
  });
  it('logs an error when posting fails', async () => {
    mock.onPost('/api/errors').networkError();
    const result = await postError(new Error('test'));
    expect(result).toBeUndefined();
  });
});

describe('postAppMessageError', () => {
  it('returns successful', async () => {
    mock.onPost('/api/errors/app-message').reply(200);
    const result = await postAppMessageError({
      body: 'Message Body',
      title: 'Message Title',
      type: 'error',
      visible: true,
      id: 'id123',
    });
    expect(result).toBeUndefined();
  });
  it('logs an error when posting fails', async () => {
    mock.onPost('/api/errors/app-message').networkError();
    const result = await postAppMessageError({
      body: 'Message Body',
      title: 'Message Title',
      type: 'error',
      visible: true,
      id: 'id123',
    });
    expect(result).toBeUndefined();
  });
});

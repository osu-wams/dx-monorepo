import { Client } from '../src/index';
import * as constants from '../src/constants';

it('handles an error', async () => {
  /* eslint-disable */
  Object.defineProperty(constants, 'GROUPER_PASSWORD', {
    value: '',
  });
  Object.defineProperty(constants, 'GROUPER_USERNAME', {
    value: '',
  });
  /* eslint-enable */

  try {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    // @ts-ignore
    const c: Client = new Client({
      host: 'host',
      username: '',
      password: '',
    });
  } catch (err) {
    expect(err.message).toContain('missing credentials');
  }
});

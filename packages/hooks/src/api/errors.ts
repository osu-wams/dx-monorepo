import axios from 'axios';
import StackTrace from 'stacktrace-js';

const IGNORED_ERRORS = ['Error: Request aborted'];

const postError = async (e: Error) => {
  const stack = await StackTrace.fromError(e).catch(err => console.error(err));
  await axios
    .post('/api/errors', { error: e.toString(), stack })
    .then(res => res)
    .catch(err => {
      console.error(`Failed to report application error: ${err}`);
    });
};

export { postError, IGNORED_ERRORS };
export default { postError };

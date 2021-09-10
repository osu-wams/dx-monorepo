import axios from 'axios';
import StackTrace from 'stacktrace-js';
import { Types } from '@osu-wams/lib';
import { BASEURL } from '../constants';

export const IGNORED_ERRORS = ['Error: Request aborted'];

export const postError = async (e: Error) => {
  const stack = await StackTrace.fromError(e).catch(err => console.error(err));
  await axios
    .post(`${BASEURL}/api/errors`, { error: e.toString(), stack })
    .then(res => res)
    .catch(err => {
      console.error(`Failed to report application error: ${err}`);
    });
};

export const postAppMessageError = async (message: Types.Message) => {
  await axios
    .post(`${BASEURL}/api/errors/app-message`, { message })
    .then(res => res)
    .catch(_err => {
      console.error(`Failed to report app message error: ${message}`);
    });
};

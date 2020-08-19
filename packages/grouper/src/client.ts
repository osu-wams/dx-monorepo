import axios, { AxiosRequestConfig } from 'axios'; // eslint-disable no-unused-vars
import { GROUPER_USERNAME, GROUPER_PASSWORD } from './constants';
import log from './log';

interface Config {
  host: string;
  webServiceVersion?: string;
  username?: string;
  password?: string;
}

export class Client {
  host: string;
  username: string;
  password: string;
  webServiceVersion: string;

  constructor(opts: Config) {
    this.host = opts.host;
    this.webServiceVersion = opts.webServiceVersion || 'v2_5_29';
    this.username = opts.username || GROUPER_USERNAME;
    this.password = opts.password || GROUPER_PASSWORD;
    if (this.username === '' || this.password === '') {
      const message =
        'Client missing credentials passed as options (username, password) or set in environment (GROUPER_USERNAME, GROUPER_PASSWORD), unable to authenticate with grouper API.';
      log.error(message);
      throw new Error(message);
    }
  }

  requestOptions(opts: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...opts,
      auth: {
        username: this.username,
        password: this.password,
      },
      headers: {
        'content-type': 'application/json',
      },
    };
  }

  uri(endpoint: string) {
    return `https://${this.host}/grouper-ws/servicesRest/${this.webServiceVersion}/${endpoint}`;
  }

  async get<T>(endpoint: string, opts?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get(this.uri(endpoint), this.requestOptions({ ...opts, method: 'GET' }));
    return response.data;
  }

  async post<T>(endpoint: string, payload: any, opts?: AxiosRequestConfig): Promise<T> {
    const response = await axios.post(
      this.uri(endpoint),
      JSON.stringify(payload),
      this.requestOptions({
        ...opts,
        method: 'POST',
      }),
    );
    return response.data;
  }
}

export default Client;

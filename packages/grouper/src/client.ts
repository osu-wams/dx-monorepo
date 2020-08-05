import axios from 'axios';

interface Config {
  host: string;
  user: string;
  pass: string;
  webServiceVersion?: string;
}

export default class Client {
  host: string;
  user: string;
  pass: string;
  webServiceVersion: string;

  constructor(opts: Config) {
    this.host = opts.host;
    this.user = opts.user;
    this.pass = opts.pass;
    this.webServiceVersion = opts.webServiceVersion || 'v2_5_29';
  }

  webServiceOptions() {
    return {
      headers: {
        'Content-Type': 'text/x-json',
      },
      auth: {
        username: this.user,
        password: this.pass,
      },
    };
  }

  uri(endpoint: string) {
    return `https://${this.host}/grouper-ws/servicesRest/${this.webServiceVersion}/${endpoint}`;
  }

  get(endpoint: string): Promise<any> {
    return axios.get(this.uri(endpoint), this.webServiceOptions());
  }

  post(endpoint: string, payload: any): Promise<any> {
    return axios.post(this.uri(endpoint), payload, this.webServiceOptions());
  }

  put(endpoint: string, payload: any): Promise<any> {
    return axios.put(this.uri(endpoint), payload, this.webServiceOptions());
  }

  delete(endpoint: string): Promise<any> {
    return axios.put(this.uri(endpoint), this.webServiceOptions());
  }
}

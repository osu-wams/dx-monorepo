interface Config {
  host: string;
  auth?: string;
  webServiceVersion?: string;
}

export default class Client {
  host: string;
  auth: string;
  webServiceVersion: string;

  constructor(opts: Config) {
    if (!opts.auth) throw new Error("missing auth ENV");
    this.host = opts.host;
    this.auth = opts.auth;
    this.webServiceVersion = opts.webServiceVersion || "v2_5_29";
  }

  fetchOptions(opts: RequestInit): RequestInit {
    return {
      ...opts,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${this.auth}`
      }
    };
  }

  uri(endpoint: string) {
    return `https://${this.host}/grouper-ws/servicesRest/${this.webServiceVersion}/${endpoint}`;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(
      this.uri(endpoint),
      this.fetchOptions({ method: "GET" })
    );
    return response.json();
  }

  async post<T>(endpoint: string, payload: any): Promise<T> {
    const response = await fetch(
      this.uri(endpoint),
      this.fetchOptions({
        method: "POST",
        body: JSON.stringify(payload)
      })
    );
    return response.json();
  }
}

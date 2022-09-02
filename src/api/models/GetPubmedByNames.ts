export declare module GetPubmedByNames {
  export interface Header {
    type: string;
    version: string;
  }

  export interface Translationset {
    from: string;
    to: string;
  }

  export interface Warninglist {
    phrasesignored: any[];
    quotedphrasesnotfound: any[];
    outputmessages: string[];
  }

  export interface Esearchresult {
    count: string;
    retmax: string;
    retstart: string;
    idlist: string[];
    translationset: Translationset[];
    translationstack: any[];
    querytranslation: string;
    warninglist: Warninglist;
  }

  export interface Data {
    header: Header;
    esearchresult: Esearchresult;
  }

  export interface Headers {
    "cache-control": string;
    "content-type": string;
    "x-ratelimit-limit": string;
    "x-ratelimit-remaining": string;
  }

  export interface Transitional {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
  }

  export interface Env {
    FormData?: any;
  }

  export interface Headers2 {
    Accept: string;
  }

  export interface Config {
    transitional: Transitional;
    transformRequest: any[];
    transformResponse: any[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Env;
    headers: Headers2;
    method: string;
    url: string;
  }

  export interface Request {}

  export interface ApiResponse {
    data: Data;
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
    request: Request;
  }
}

export declare module GetPubMedByIds {
  export interface Header {
    type: string;
    version: string;
  }

  export interface Author {
    name: string;
    authtype: string;
    clusterid: string;
  }

  export interface Articleid {
    idtype: string;
    idtypen: number;
    value: string;
  }

  export interface History {
    pubstatus: string;
    date: string;
  }

  export interface Publication {
    uid: string;
    pubdate: string;
    epubdate: string;
    source: string;
    authors: Author[];
    lastauthor: string;
    title: string;
    sorttitle: string;
    volume: string;
    issue: string;
    pages: string;
    lang: string[];
    nlmuniqueid: string;
    issn: string;
    essn: string;
    pubtype: string[];
    recordstatus: string;
    pubstatus: string;
    articleids: Articleid[];
    history: History[];
    references: any[];
    attributes: string[];
    pmcrefcount: string;
    fulljournalname: string;
    elocationid: string;
    doctype: string;
    srccontriblist: any[];
    booktitle: string;
    medium: string;
    edition: string;
    publisherlocation: string;
    publishername: string;
    srcdate: string;
    reportnumber: string;
    availablefromurl: string;
    locationlabel: string;
    doccontriblist: any[];
    docdate: string;
    bookname: string;
    chapter: string;
    sortpubdate: string;
    sortfirstauthor: string;
    vernaculartitle: string;
  }

  export interface Result {
    uids: string[];
  }

  export interface Data {
    header: Header;
    result: Result;
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
    headers: Headers;
    method: string;
    url: string;
  }

  export interface ApiResponse {
    data: Data;
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
    request: Request;
  }
}

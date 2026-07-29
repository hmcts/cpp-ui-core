import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GENERATE_UNIQUE_KEY, GenerateUniqueKeyFn } from './util';

export const HTTP_CONFIG = new InjectionToken<CppHttpConfig>('CppHttpConfig');

export interface CppHttpConfig {
  baseUrl: string;
}

export interface GetRequestOptions {
  cache?: boolean;
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  responseType?: any;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface PostRequestOptions {
  headers?: HttpHeaders;
  observe?: 'response' | 'events' | 'body';
  params?: HttpParams;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable()
export class CppHttpBackend {
  constructor(
    @Inject(HTTP_CONFIG) private config: CppHttpConfig,
    @Inject(GENERATE_UNIQUE_KEY) private generateUniqueKey: GenerateUniqueKeyFn,
    private http: HttpClient
  ) {}

  get<R>(
    url: string,
    requestType: string,
    { cache, ...options }: GetRequestOptions = {}
  ): Observable<R> {
    const params = options.params || new HttpParams();
    const headers = options.headers || new HttpHeaders();

    return this.http.get(`${this.config.baseUrl}${url}`, {
      ...options,
      headers: headers.set('Accept', requestType),
      // where explicit caching is not required, attach a timestamp to to the query
      // parameters to prevent aggressive caching by browsers (e.g. IE11)
      params: cache ? params : params.set('_', this.generateUniqueKey())
    }) as Observable<R>;
  }

  // note that an empty object as the body is required else the content-type will be stripped

  post<T extends PostRequestOptions = PostRequestOptions>(
    url: string,
    requestType?: string,
    body: FormData | any | null = {},
    options: T = {} as T
  ): Observable<any | HttpResponse<any> | HttpEvent<any>> {
    let headers = options.headers || new HttpHeaders();
    headers = headers.set('Accept', '*/*');

    if (requestType) {
      headers = headers.set('Content-Type', requestType);
    }
    return this.http.post(`${this.config.baseUrl}${url}`, body, {
      observe: 'response',
      responseType: 'text',
      ...options,
      headers
    });
  }
}

import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SpoilerLogApiService {
    constructor(private http: HttpClient) { }

    baseUrl: string = environment.baseUrl + 'spoilerlog/';

    private GetHeaders(contentType: string = 'application/json; charset=utf-8'): HttpHeaders {
        let headers = new HttpHeaders().set('Accept', '*/*');
        return contentType !== null ? headers.set('Content-Type', contentType) : headers;
    }

    Get<T>(endpoint: string, contentType: string = 'application/json; charset=utf-8') {
        let response = this.http.get<T>(this.baseUrl + endpoint);

        return response;
    }

    Post<T>(endpoint: string, body: any = null, contentType: string = 'application/json; charset=utf-8') {
        //let headers = this.GetHeaders(contentType);
        let response = this.http.post<T>(this.baseUrl + endpoint, body);//, { headers: headers });

        return response; 
    }
}

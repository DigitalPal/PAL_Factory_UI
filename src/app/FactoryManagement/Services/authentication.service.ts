import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  userAuthentication(userName, password): Observable < any > {
    const url = environment.factoryAPIBase + '/token';
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    return this.http.post(url, data, {
      headers: header
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Session } from '../models';


@Injectable()
export class SessionsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug, payload): Observable<Session> {
    return this.apiService
    .post(
      `/clients/${slug}/sessions`,
      { session: { body: payload } }
    ).map(data => data.session);
  }

  getAllForClient(slug): Observable<Session[]> {
    return this.apiService.get(`/clients/${slug}/sessions`)
           .map(data => data.sessions);
  }

  destroy(sessionId) {
    return this.apiService
           .delete(`/sessions/${sessionId}`)
  }

  getAll(): Observable<Session[]> {
    return this.apiService
      .get('/sessions')
      .map(res => res);
  }

  getDay(date): Observable<Session[]> {
    var today = new Date(date);
    var todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return this.apiService
      .get('/sessions/' + todayString + '/3')
      .map(data => data.sessions);
  }

}

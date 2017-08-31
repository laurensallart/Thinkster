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

  getAll(slug): Observable<Session[]> {
    const req = this.apiService.get(`/clients/${slug}/sessions`)
           .map(data => data.sessions);
    return req;
  }

  destroy(sessionId, clientSlug) {
    return this.apiService
           .delete(`/clients/${clientSlug}/sessions/${sessionId}`);
  }

}

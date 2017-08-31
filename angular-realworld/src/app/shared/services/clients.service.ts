import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Client, ClientListConfig } from '../models';

@Injectable()
export class ClientsService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: ClientListConfig): Observable<{clients: Client[], clientsCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    let params: URLSearchParams = new URLSearchParams();

    Object.keys(config.filters)
    .forEach((key) => {
      params.set(key, config.filters[key]);
    });

    return this.apiService
    .get(
      '/clients',
      params
    ).map(data => data);
  }

  get(slug): Observable<Client> {
    return this.apiService.get('/clients/' + slug)
           .map(data => data.client);
  }

  destroy(slug) {
    return this.apiService.delete('/clients/' + slug);
  }

  save(client): Observable<Client> {
    // If we're updating an existing client
    if (client.slug) {
      console.log("updating existing client");
      return this.apiService.put('/clients/' + client.slug, {client: client})
             .map(data => data.client);

    // Otherwise, create a new client
    } else {
      console.log("creating new client");
      return this.apiService.post('/clients/', {client: client})
             .map(data => data.client);
    }
  }
}

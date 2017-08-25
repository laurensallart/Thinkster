import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Client, ClientsService, UserService } from '../shared';

@Injectable()
export class ClientResolver implements Resolve<Client> {
  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.clientsService.get(route.params['slug'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}

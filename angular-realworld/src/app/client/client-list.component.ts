import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientResolver } from './client-resolver.service';

import {
  Client,
  ClientsService,
  ClientListConfig,
  User,
  UserService
} from '../shared';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  results: Client[];
  query: ClientListConfig;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched client
    this.query = new ClientListConfig()
    this.query.filters.offset = 0;
    // Load the current user's data
    this.runQuery();
  }
  runQuery() {
    this.results = [];

    this.clientsService.query(this.query)
    .subscribe(data => {
      this.results = data.clients;
    });
  }
};


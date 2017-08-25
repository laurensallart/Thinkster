import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Client,
  ClientsService,
  ClientListConfig,
  User,
  UserService,
  Session,
} from '../shared';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnInit {
  results: Session[];
  // query: ClientListConfig;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private router: Router,
    private userService: UserService,
  ) { }

  @Input() slug: string;

  ngOnInit() {
    console.log(this.route);
    // // Retreive the prefetched client
    // this.query = new ClientListConfig()
    // this.query.filters.offset = 0;
    // // Load the current user's data
    // this.runQuery();
  }

  // runQuery() {
  //   this.results = [];

  //   this.clientsService.query(this.query)
  //   .subscribe(data => {
  //     this.results = data.clients;
  //     console.log("test2");
  //     console.log(this.results);
  //   });
  // }
};


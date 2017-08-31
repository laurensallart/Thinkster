import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionListComponent } from '../session/session-list.component';

import {
  Client,
  ClientsService,
} from '../shared';

@Component({
  selector: 'client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  client: Client;


  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private router: Router,
  ) { }

  ngOnInit() {
      // Retreive the prefetched client
      this.route.data.subscribe(
        (data: { client: Client }) => {
          this.client = data.client;
          console.log(this.client);
        }
      );
    }
};


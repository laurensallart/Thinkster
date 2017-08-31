import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Client,
  SessionsService,
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

  constructor(
    private route: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private userService: UserService,
  ) { }

  @Input() slug: string;

  ngOnInit() {
    // Retreive the prefetched client
    this.runQuery();
  }

  runQuery() {
    this.results = [];
    this.sessionsService.getAll(this.route.snapshot.params['slug'])
    .subscribe(data => {
      this.results = data;
      console.log(this.results);
    });
  }

  remove_session(id: any) {
    console.log("removing session ");
    console.log(id);
    console.log(this.slug);
    var a = this.sessionsService.destroy(id, this.route.snapshot.params['slug'])
    .subscribe(
      success => {
        console.log('succes');
        /*this.router.navigateByUrl('/');*/
      }
    );;
    return a;
  }
};


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Session,
  SessionsService,
} from '../shared';

@Component({
  selector: 'add-session',
  templateUrl: './add-session.component.html'
})
export class AddSessionComponent {

  sessionForm: FormGroup;
  newSession: Session = new Session();

  constructor(
    private route: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // use the FormBuilder to create a form group
    this.sessionForm = this.fb.group({

      title: 'default',
      description: '',
      date: '',
      durationInMinutes: 0,
    });
    // Optional: subscribe to value changes on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  addSession() {
    // update the model
    this.updateSession(this.sessionForm.value);
    // // post the changes
    console.log(this.route.snapshot.params['slug']);
    console.log(this.newSession);
    this.sessionsService
    .add(this.route.snapshot.params['slug'], this.newSession)
    .subscribe(data => {
      console.log(data);
    });

  }

  updateSession(values: Object) {
    (<any>Object).assign(this.newSession, values);
  }
};


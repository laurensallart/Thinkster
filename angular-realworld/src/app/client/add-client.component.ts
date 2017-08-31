import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Client,
  ClientsService,
} from '../shared';

@Component({
  selector: 'add-client',
  templateUrl: './add-client.component.html'
})
export class AddClientComponent {
  result: Client;
  newClient: Client = new Client();
  clientForm: FormGroup;
  errors: Object = {};

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // use the FormBuilder to create a form group
    this.clientForm = this.fb.group({
      firstName: '',
      lastName: '',
      telephone: '',
      birthday: '',
      street: '',
      postalCode: -1,
      city: '',
    });
    // Optional: subscribe to value changes on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  addClient() {
    console.log('adding client...');
    // update the model
    this.updateClient(this.clientForm.value);
    // post the changes
    this.clientsService.save(this.newClient);

  }

  updateClient(values: Object) {
    (<any>Object).assign(this.newClient, values);
  }
};


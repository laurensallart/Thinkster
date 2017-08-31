import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCheckboxModule, MdInputModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { Md2DatepickerModule } from 'md2';

import { ClientListComponent } from './client-list.component';
import { AddClientComponent } from './add-client.component';
import { ClientComponent } from './client.component';
import { ClientResolver } from './client-resolver.service';
import { SessionModule } from '../session/session.module';
import { SharedModule } from '../shared';

const clientRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'clients',
    component: ClientListComponent,
  },
  {
    path: 'addclient',
    component: AddClientComponent,
  },
  {
    path: 'clients/:slug',
    component: ClientComponent,
    resolve: {
      client: ClientResolver
    }
  }
]);

@NgModule({
  imports: [
    clientRouting,
    SharedModule,
    SessionModule,
    BrowserAnimationsModule,
    MdCheckboxModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    Md2DatepickerModule
  ],
  declarations: [
    ClientListComponent,
    ClientComponent,
    AddClientComponent,
  ],
  providers: [
    ClientResolver
  ]
})
export class ClientModule {}

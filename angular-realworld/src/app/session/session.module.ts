import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule } from '@angular/material';
import { Md2DatepickerModule } from 'md2';


import { SessionListComponent } from './session-list.component';
import { AddSessionComponent } from './add-session.component';
import { AgendaComponent} from './agenda.component';
import { SharedModule } from '../shared';

const sessionRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'clients/:slug/sessions',
    component: SessionListComponent,
  },
  {
    path: 'clients/:slug/addsession',
    component: AddSessionComponent,
  },
  {
    path: 'agenda',
    component: AgendaComponent,
  }
]);

@NgModule({
  imports: [
    sessionRouting,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    Md2DatepickerModule
  ],
  declarations: [
    SessionListComponent,
    AddSessionComponent,
    AgendaComponent,
  ],
  exports: [
    SessionListComponent,
  ]
})
export class SessionModule {}

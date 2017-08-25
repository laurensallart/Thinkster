import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';

if (environment.production) {
  console.log("production");
  enableProdMode();
}

var bootstrapPromise =  platformBrowserDynamic().bootstrapModule(AppModule);
console.error("testje");
//Logging bootstrap information
bootstrapPromise.then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));

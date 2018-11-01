import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { StaticInjectorService } from './services/injector/static-injector.service';

import { AngularMaterialModule } from './shared/angular-material.module';

import { LibRoutingModule } from './lib-routing.module';

import { AccountsComponent } from './components/accounts/accounts.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { IndividualComponent } from './components/individual/individual.component';

import { LoggerService } from './services/logger/logger.service';
import { ConsoleLoggerService } from './services/logger/console-logger.service';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/mocks/api/in-memory-data.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    HttpClientInMemoryWebApiModule.forFeature(InMemoryDataService, { passThruUnknownUrl: true, delay: 1500 }),
    TranslateModule.forChild(),

    LibRoutingModule  // https://angular.io/guide/router#routing-module-order
  ],
  declarations: [
    AccountsComponent,
    ContactsComponent,
    IndividualComponent
  ],
  providers: [
    { provide: LoggerService, useClass: ConsoleLoggerService }
  ],
  exports: [
    AccountsComponent,
    ContactsComponent,
    IndividualComponent
  ]
})
export class SalesModule {

  constructor(private injector: Injector,
              private logger: LoggerService) {

    StaticInjectorService.setInjector(injector);
  }

}

/*

// this.logger.info('SalesModule: constructor()');

// import { LoggerService } from './services/logger/logger.service';
// import { ConsoleLoggerService } from './services/logger/console-logger.service';

// { provide: LoggerService, useClass: ConsoleLoggerService }

[ ContactsComponent, AccountsComponent, LoggerService, ConsoleLoggerService ]

// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';

*/

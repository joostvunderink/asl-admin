import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { CountryService }     from './core/country/country.service';
import { SportService }       from './core/sport/sport.service';

import { AppComponent }             from './app.component';
import { CountryComponent }         from './core/country/country.component';
import { SportComponent }           from './core/sport/sport.component';
import { SportPerCountryComponent } from './core/sport/sport-per-country.component';
// import { DashboardComponent }       from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'countries',         component: CountryComponent },
  { path: 'sports',            component: SportComponent },
  { path: 'sport-per-country', component: SportPerCountryComponent },
  // { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    SportComponent,
    SportPerCountryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [
    CountryService,
    SportService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

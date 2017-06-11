import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InlineEditorModule }        from 'ng2-inline-editor';

import { CountryService }     from './core/country/country.service';
import { SportService }       from './core/sport/sport.service';
import { RegionService }      from './core/region/region.service';
import { ClubService }        from './club/club/club.service';

import { AppComponent }             from './app.component';
import { CountryComponent }         from './core/country/country.component';
import { SportComponent }           from './core/sport/sport.component';
import { RegionComponent }          from './core/region/region.component';

import { ClubComponent }            from './club/club/club.component';

// import { DashboardComponent }       from './dashboard/dashboard.component';

const appRoutes: Routes = [
  // Core routes
  { path: 'countries',         component: CountryComponent },
  { path: 'sports',            component: SportComponent },
  { path: 'regions',           component: RegionComponent },

  // Club routes
  { path: 'clubs',             component: ClubComponent },
  // { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    SportComponent,
    RegionComponent,
    ClubComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    InlineEditorModule,
  ],
  providers: [
    CountryService,
    SportService,
    RegionService,
    ClubService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

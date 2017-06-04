import { Component }              from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { SportService } from './sport.service';
import { ISport }       from './sport.interface';

import { CountryService } from '../country/country.service';
import { ICountry }       from '../country/country.interface';

@Component({
    templateUrl: './sport-per-country.component.html',
})
export class SportPerCountryComponent {
    countries: FirebaseListObservable<ICountry[]>;
    sports: FirebaseListObservable<ISport[]>;
    sportsPerCountry: FirebaseListObservable<any[]>;
    selectedCountry: ICountry;


    constructor(private sportService: SportService, private countryService: CountryService) {
        this.sports = this.sportService.getSports();
        this.countries = this.countryService.getCountries();
    }

    countrySelect() {
        console.log('country select', this.selectedCountry.code, this.selectedCountry.$key);
        this.sportsPerCountry = this.sportService.getSportsPerCountry(this.selectedCountry.$key);
        this.sportsPerCountry.subscribe(
            value => console.log('value', value),

        );
    }

    sportToggle(sport, $event) {
        console.log('sportToggle');
        console.log(this.selectedCountry);
        console.log($event.target.checked);
        if ($event.target.checked) {
            this.sportService.addSportToCountry(this.selectedCountry.$key, sport.$key);
        }
        else {
            this.sportService.removeSportFromCountry(this.selectedCountry.$key, sport.$key);
        }

    }

    deleteSport(key: string) {
        this.sportService.removeSport(key);
    }

    onSubmit() {
    }
}

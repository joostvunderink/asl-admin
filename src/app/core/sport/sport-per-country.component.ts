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
    selectedCountry: ICountry;
    selectedCountryKey: string;

    constructor(private sportService: SportService, private countryService: CountryService) {
        this.sports = this.sportService.getSports();
        this.countries = this.countryService.getCountries();
    }

    countrySelect() {
        // TODO: Figure out what's going on here: why do we need 2 forEach loops inside
        // each other?
        this.countries.forEach((countries) => {
            countries.forEach((c) => {
                if (c.$key === this.selectedCountryKey) {
                    this.selectedCountry = c;
                }    
            });
        });
    }

    sportToggle(sport, $event) {
        if ($event.target.checked) {
            this.sportService.addSportToCountry(this.selectedCountryKey, sport.$key);
        }
        else {
            this.sportService.removeSportFromCountry(this.selectedCountryKey, sport.$key);
        }
    }
}

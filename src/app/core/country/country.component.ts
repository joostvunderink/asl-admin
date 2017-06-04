import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { CountryService } from './country.service';

import { ICountry } from './country.interface';

@Component({
    templateUrl: './country.component.html',
})
export class CountryComponent {
    countries: FirebaseListObservable<ICountry[]>;
    newCountry: ICountry = { name: '', code: '', $key: '', sports: {} };

    constructor(private countryService: CountryService) {
        this.countries = this.countryService.getCountries();
    }

    deleteCountry(key: string) {
        this.countryService.removeCountry(key);
    }

    onSubmit() {
        this.countryService.addCountry(this.newCountry);
        this.newCountry.name = '';
        this.newCountry.code = '';
    }
}

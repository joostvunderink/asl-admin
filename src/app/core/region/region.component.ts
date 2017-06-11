import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
// import { InlineEditorDirectives } from 'ng2-inline-editor';

import { RegionService }  from './region.service';
import { SportService }   from '../sport/sport.service';
import { CountryService } from '../country/country.service';

import { IRegion }  from './region.interface';
import { ISport }   from '../sport/sport.interface';
import { ICountry } from '../country/country.interface';

@Component({
    templateUrl: './region.component.html',
})
export class RegionComponent {
    countries: FirebaseListObservable<ICountry[]>;
    sports: FirebaseListObservable<ISport[]>;
    regions: FirebaseListObservable<IRegion[]>;

    selectedCountry: ICountry;
    selectedCountryKey: string;
    selectedSport: ISport;
    selectedSportKey: string;

    newRegion: IRegion = { name: '', description: '', $key: '', country_sport_key: '' };

    constructor(private sportService: SportService, private countryService: CountryService, private regionService: RegionService) {
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

        this.sportOrCountrySelected();
    }

    sportSelect() {
        // TODO: Figure out what's going on here: why do we need 2 forEach loops inside
        // each other?
        this.sports.forEach((sports) => {
            sports.forEach((c) => {
                if (c.$key === this.selectedSportKey) {
                    this.selectedSport = c;
                }    
            });
        });

        this.sportOrCountrySelected();
    }

    sportOrCountrySelected() {
        if (!(this.selectedCountry && this.selectedSport)) {
            return;
        }
        const key = this.selectedCountryKey + ':' + this.selectedSportKey;
        console.log('Getting regions of ' + key);
        this.newRegion.country_sport_key = key;
        this.regions = this.regionService.getRegionsPerCountrySport(key);
    }

    deleteRegion(key: string) {
        this.regionService.removeRegion(key);
    }

    saveRegion(region) {
        console.log('saveRegion');
        console.log(region);
        this.regionService.updateRegion(region);
    }

    onSubmit() {
        this.regionService.addRegion(this.newRegion);
        this.newRegion.name = '';
        this.newRegion.description = '';
    }
}

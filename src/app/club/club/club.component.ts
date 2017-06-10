import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { RegionService }  from '../../core/region/region.service';
import { SportService }   from '../../core/sport/sport.service';
import { CountryService } from '../../core/country/country.service';
import { ClubService }    from './club.service';

import { IRegion }  from '../../core/region/region.interface';
import { ISport }   from '../../core/sport/sport.interface';
import { ICountry } from '../../core/country/country.interface';
import { IClub }    from './club.interface';

@Component({
    templateUrl: './club.component.html',
})
export class ClubComponent {
    countries: FirebaseListObservable<ICountry[]>;
    sports: FirebaseListObservable<ISport[]>;
    regions: FirebaseListObservable<IRegion[]>;
    clubs: FirebaseListObservable<IClub[]>;

    selectedCountry: ICountry;
    selectedCountryKey: string;
    selectedSport: ISport;
    selectedSportKey: string;
    selectedRegion: IRegion;
    selectedRegionKey: string;

    newClub: IClub = { name: '', description: '', $key: '', region_key: '' };

    constructor(private sportService: SportService, private countryService: CountryService,
                private regionService: RegionService, private clubService: ClubService) {
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
        this.newClub.region_key = key;
        this.regions = this.regionService.getRegionsPerCountrySport(key);
    }

    regionSelect() {
        // TODO: Figure out what's going on here: why do we need 2 forEach loops inside
        // each other?
        this.regions.forEach((regions) => {
            regions.forEach((c) => {
                if (c.$key === this.selectedRegionKey) {
                    this.selectedRegion = c;
                }    
            });
        });
        const key = this.selectedRegionKey;
        console.log('Getting clubs of ' + key);
        this.newClub.region_key = key;
        this.clubs = this.clubService.getClubsPerRegion(key);
    }

    deleteClub(key: string) {
        this.clubService.removeClub(key);
    }

    onSubmit() {
        this.clubService.addClub(this.newClub);
        this.newClub.name = '';
        this.newClub.description = '';
    }
}

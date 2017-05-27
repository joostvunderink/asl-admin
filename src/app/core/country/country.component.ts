import { Component } from '@angular/core';

interface ICountry {
    name: string;
    code: string;
}

@Component({
    templateUrl: './country.component.html',
})
export class CountryComponent {
    countries: ICountry[] = [
        {
            code: 'nl',
            name: 'The Netherlands',
        },
        {
            code: 'de',
            name: 'Germany',
        },
        {
            code: 'be',
            name: 'Belgium',
        },
    ];
}
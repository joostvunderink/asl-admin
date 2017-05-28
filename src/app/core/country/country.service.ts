import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ICountry } from './country.interface';

@Injectable()
export class CountryService {
    _db: AngularFireDatabase;

    constructor(db: AngularFireDatabase) {
        this._db = db;
    }

    getCountries(): FirebaseListObservable<ICountry[]> {
        return this._db.list('/countries');
    }

    addCountry(country: ICountry) {
        this._db.list('/countries').push(country);
    }

    removeCountry(key: string) {
        this._db.object('/countries/' + key).remove();
    }

}
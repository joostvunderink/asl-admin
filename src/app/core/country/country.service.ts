import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ICountry } from './country.interface';

@Injectable()
export class CountryService {
    _db: AngularFireDatabase;

    constructor(db: AngularFireDatabase) {
        this._db = db;
    }

    getCountry(key): FirebaseObjectObservable<any> {
        return this._db.object('/countries/' + key);
    }

    getCountries(): FirebaseListObservable<ICountry[]> {
        return this._db.list('/countries');
    }

    addCountry(country: ICountry) {
        const o = country;
        delete o.$key;
        this._db.list('/countries').push(o);
    }

    removeCountry(key: string) {
        this._db.object('/countries/' + key).remove();
    }

}
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ISport } from './sport.interface';

@Injectable()
export class SportService {
    _db: AngularFireDatabase;

    constructor(db: AngularFireDatabase) {
        this._db = db;
    }

    getSports(): FirebaseListObservable<ISport[]> {
        return this._db.list('/sports');
    }

    addSport(sport: ISport) {
        const o = sport;
        delete o.$key;
        this._db.list('/sports').push(o);
    }

    removeSport(key: string) {
        this._db.object('/sports/' + key).remove();
    }

    getSportsPerCountry(countryKey): FirebaseListObservable<any[]> {
        const path = '/sports_countries/' + countryKey;
        console.log('getSportsPerCountry', path);
        return this._db.list(path);
    }

    addSportToCountry(countryKey, sportKey): void {
        const path = '/countries/' + countryKey + '/sports/' + sportKey;
        console.log('addSportToCountry', path);
        this._db.object(path).set(true);
    }

    removeSportFromCountry(countryKey, sportKey): void {
        const path = '/countries/' + countryKey + '/sports/' + sportKey;
        console.log('addSportToCountry', path);
        this._db.object(path).set(false);
    }

}
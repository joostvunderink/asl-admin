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
        this._db.list('/sports').push(sport);
    }

    removeSport(key: string) {
        this._db.object('/sports/' + key).remove();
    }

}
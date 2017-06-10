import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { IClub } from './club.interface';

@Injectable()
export class ClubService {
    _db: AngularFireDatabase;

    constructor(db: AngularFireDatabase) {
        this._db = db;
    }

    getClub(key): FirebaseObjectObservable<any> {
        return this._db.object('/clubs/' + key);
    }

    getClubs(): FirebaseListObservable<IClub[]> {
        return this._db.list('/clubs');
    }

    getClubsPerRegion(regionKey): FirebaseListObservable<IClub[]> {
        console.log('getting clubs by country_sport_key ' + regionKey);
        return this._db.list('/clubs', {
            query: {
                orderByChild: 'region_key',
                equalTo: regionKey,
            }
        });
    }

    addClub(club: IClub) {
        // TODO: the fact that IClub contains $key might be a bad practice
        const r = club;
        delete club.$key;
        this._db.list('/clubs').push(r);
    }

    removeClub(key: string) {
        this._db.object('/clubs/' + key).remove();
    }

}
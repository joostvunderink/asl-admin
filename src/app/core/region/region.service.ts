import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { IRegion } from './region.interface';

@Injectable()
export class RegionService {
    _db: AngularFireDatabase;

    constructor(db: AngularFireDatabase) {
        this._db = db;
    }

    getRegion(key): FirebaseObjectObservable<any> {
        return this._db.object('/regions/' + key);
    }

    getRegions(): FirebaseListObservable<IRegion[]> {
        return this._db.list('/regions');
    }

    getRegionsPerCountrySport(countrySportKey): FirebaseListObservable<IRegion[]> {
        console.log('getting regions by country_sport_key ' + countrySportKey);
        return this._db.list('/regions', {
            query: {
                orderByChild: 'country_sport_key',
                equalTo: countrySportKey,
            }
        });
    }

    addRegion(region: IRegion) {
        // TODO: the fact that IRegion contains $key might be a bad practice
        const r = region;
        delete region.$key;
        this._db.list('/regions').push(r);
    }

    removeRegion(key: string) {
        this._db.object('/regions/' + key).remove();
    }

}
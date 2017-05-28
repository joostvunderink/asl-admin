import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { SportService } from './sport.service';

import { ISport } from './sport.interface';

@Component({
    templateUrl: './sport.component.html',
})
export class SportComponent {
    sports: FirebaseListObservable<ISport[]>;
    newSport: ISport = { name: '' };

    constructor(private sportService: SportService) {
        this.sports = this.sportService.getSports();
    }

    deleteSport(key: string) {
        this.sportService.removeSport(key);
    }

    onSubmit() {
        this.sportService.addSport(this.newSport);
        this.newSport.name = '';
    }
}

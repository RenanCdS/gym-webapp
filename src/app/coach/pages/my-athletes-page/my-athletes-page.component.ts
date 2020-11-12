import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Athlete } from 'src/app/core/models/Athlete';
import { AppPageActions } from 'src/app/state/actions';
import { getMyAthletes, State } from '../../state';
import { CoachPageActions } from '../../state/actions';

@Component({
  selector: 'app-my-athletes-page',
  templateUrl: './my-athletes-page.component.html',
  styleUrls: ['./my-athletes-page.component.scss']
})
export class MyAthletesPageComponent implements OnInit {
  myAthletes: Observable<Athlete[]>;
  constructor(private readonly store: Store<State>,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.myAthletes = this.store.select(getMyAthletes);
    this.store.dispatch(CoachPageActions.getMyAthletes());
  }

  editAthlete(athlete: Athlete): void {
    this.store.dispatch(AppPageActions.updateAthlete({ athlete }));
  }

}

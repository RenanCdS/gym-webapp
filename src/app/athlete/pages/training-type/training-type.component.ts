import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getIsFinished, getIsStarted, State } from '../../state';
import { AthletePageActions } from '../../state/actions';

@Component({
  selector: 'app-training-type',
  templateUrl: './training-type.component.html',
  styleUrls: ['./training-type.component.scss']
})
export class TrainingTypeComponent implements OnInit {

  constructor(private readonly store: Store<State>,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    combineLatest([this.store.select(getIsStarted), this.store.select(getIsFinished)]).subscribe(
      ([isStarted, isFinished]) => {
        if (isStarted === null || isFinished == null) {
          this.store.dispatch(AthletePageActions.verifyTrainingStatus());
          return;
        }

        if (isFinished) {
          this.router.navigate(['home']);
          this.snackBar.open('Seu treino diário já foi concluído ;)');
          return;
        }

        if (isStarted) {
          this.router.navigate(['/atleta/treino']);
          return;
        }

      }
    );
    this.store.select(getIsStarted);
  }

}

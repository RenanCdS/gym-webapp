import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { getIsFinished, getIsStarted, State } from '../../state';
import { AthletePageActions } from '../../state/actions';

@Component({
  selector: 'app-training-type',
  templateUrl: './training-type.component.html',
  styleUrls: ['./training-type.component.scss']
})
export class TrainingTypeComponent implements OnInit {

  readonly trainingType = TrainingTypeEnum;
  constructor(private readonly store: Store<State>,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.store.dispatch(AthletePageActions.verifyTrainingStatus());
    combineLatest([this.store.select(getIsStarted), this.store.select(getIsFinished)]).subscribe(
      ([isStarted, isFinished]) => {
        if (isStarted === null || isFinished == null) {
          return;
        }

        if (isFinished) {
          this.router.navigate(['home']);
          this.snackBar.open('Seu treino diário já foi concluído ;)', '', {
            verticalPosition: 'top',
            duration: 2000
          });
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

  startTraining(trainingType: TrainingTypeEnum): void {
    this.store.dispatch(AthletePageActions.startTraining({ trainingType }));
  }
}

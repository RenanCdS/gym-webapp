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
  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(AthletePageActions.verifyTrainingStatus());
  }

  startTraining(trainingType: TrainingTypeEnum): void {
    this.store.dispatch(AthletePageActions.startTraining({ trainingType }));
  }
}

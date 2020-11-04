import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map, skip, tap } from 'rxjs/operators';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';
import { Exercise } from '../../models/api/exercise';
import { getExercises, State } from '../../state';
import { AthletePageActions } from '../../state/actions';

@Component({
  selector: 'app-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.scss']
})
export class TrainingPageComponent implements OnInit {

  @ViewChild('swiperGallery') swiperGallery: SwiperComponent;
  @ViewChild('successModal') successModal: TemplateRef<any>;
  @ViewChild('finalizedTraining') finalizedTraining: TemplateRef<any>;

  exercises$: Observable<Exercise[]>;
  swiperConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,

  };

  constructor(private readonly dialog: MatDialog,
    private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.exercises$ = this.store.select(getExercises).pipe(
      skip(1),
      map(exercises => exercises ? exercises?.filter(exercise => !exercise.completed) : []),
      tap(exercises => {
        if (exercises && exercises.length === 0) {
          this.store.dispatch(AthletePageActions.finalizeTraining({ isFinished: true, dailyTrainingId: 1 }));
          this.dialog.open(SuccessModalComponent);
        }
      })
    );

    this.store.dispatch(AthletePageActions.loadExercises({ trainingType: TrainingTypeEnum.A }));
  }

  onDoneHandler(exercise: Exercise): void {
    const currentExercise: Exercise = Object.assign({}, exercise, { completed: true });
    this.store.dispatch(AthletePageActions.jumpExercise({ exercise: currentExercise }));
    this.swiperGallery.directiveRef.update();
  }

  /**
   * @description exibe a modal de confirmação de finalização do treino
   * @param modal modal a ser exibida
   */
  onFinishHandler(modal: TemplateRef): void {
    this.dialog.open(modal);
  }

  finishTraining(): void {
    this.store.dispatch(AthletePageActions.finalizeTraining({ isFinished: false, dailyTrainingId: 1 }));
    this.dialog.closeAll();
    this.dialog.open(this.finalizedTraining);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}

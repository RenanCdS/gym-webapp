import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  changeWeightForm: FormGroup;

  constructor(private readonly dialog: MatDialog,
    private readonly store: Store<State>,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.exercises$ = this.store.select(getExercises).pipe(
      map(exercises => exercises ? exercises?.filter(exercise => !exercise.completed) : []),
      tap(exercises => {
        console.log(exercises);
        if (exercises && exercises.length === 0) {
          this.store.dispatch(AthletePageActions.finalizeTraining({ isFinished: true, dailyTrainingId: 1 }));
          this.dialog.open(SuccessModalComponent);
        }
      })
    );

    this.initalizeChangeWeightForm();
  }

  onDoneHandler(exercise: Exercise): void {
    const currentExercise: Exercise = Object.assign({}, exercise, { completed: true });
    this.store.dispatch(AthletePageActions.doneExercise({ exercise: currentExercise }));
    this.swiperGallery.directiveRef.update();
  }

  /**
   * @description exibe a modal de confirmação de finalização do treino
   * @param modal modal a ser exibida
   */
  onFinishHandler(modal: TemplateRef<any>): void {
    this.dialog.open(modal);
  }

  finishTraining(): void {
    this.store.dispatch(AthletePageActions.finalizeTraining({ isFinished: false, dailyTrainingId: 1 }));
    this.dialog.closeAll();
    this.dialog.open(this.finalizedTraining);
  }

  changeWeight(exercise: Exercise): void {
    if (!this.changeWeightForm.valid) {
      this.changeWeightForm.markAllAsTouched();
      this.changeWeightForm.updateValueAndValidity();
      return;
    }
    const currentWeight = this.changeWeightForm.get('currentWeight').value;
    this.store.dispatch(AthletePageActions.changeExerciseWeight({ exercise, currentWeight }));
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  private initalizeChangeWeightForm(): void {
    this.changeWeightForm = this.fb.group({
      currentWeight: this.fb.control('', [Validators.required, Validators.pattern('[0-9]*')])
    });
  }
}

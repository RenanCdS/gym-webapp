import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';
import { Exercise } from '../../models/api/exercise';
import { getMyTrainingSuccess, State } from '../../state';
import { AthletePageActions } from '../../state/actions';

@Component({
  selector: 'app-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.scss']
})
export class TrainingPageComponent implements OnInit {

  exercises$: Observable<Exercise[]>;
  @ViewChild('swiperGallery') swiperGallery: SwiperComponent;

  swiperConfig: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    centeredSlides: true,
    centerInsufficientSlides: true,
    centeredSlidesBounds: true,
    resistance: false,
    allowTouchMove: false,
  };

  constructor(private readonly dialog: MatDialog,
    private readonly store: Store<State>,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.exercises$ = this.store.select(getMyTrainingSuccess).pipe(
      tap(myTrainingResponse => {
        if (myTrainingResponse?.isFinished) {
          this.snackBar.open('Seu treino já foi finalizado :)', '', {

          });
          return;
        }

        if (myTrainingResponse?.isStarted) {
          this.snackBar.open('Bem vindo de volta :)', '', {

          });
        }

      }),
      map(myTrainingResponse => myTrainingResponse?.exercises),
      tap(() => this.swiperGallery?.directiveRef.update())
    );
    this.store.dispatch(AthletePageActions.loadExercises({ trainingType: TrainingTypeEnum.A }));
  }

  onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
    if (index === 4) {
      this.openModal();
    }
  }

  onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

  openModal(): void {
    this.dialog.open(SuccessModalComponent);
  }

  done(): void {
    this.swiperGallery.directiveRef.nextSlide();
    this.swiperGallery?.directiveRef.update()
  }
}

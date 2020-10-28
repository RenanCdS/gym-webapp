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
  slides = [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1535743686920-55e4145369b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  ];

  config_gallery: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    loop: true,
    initialSlide: 1,
    centeredSlides: true,
    allowSlidePrev: true,
    centerInsufficientSlides: true,
    centeredSlidesBounds: true,
    resistance: false,
    allowSlideNext: true,
    zoom: false
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
      map(myTrainingResponse => myTrainingResponse?.exercises)
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
    this.swiperGallery.directiveRef.nextSlide(2);
  }
}

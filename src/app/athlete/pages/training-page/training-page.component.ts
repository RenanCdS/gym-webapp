import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Exercise } from '../../models/api/exercise';
import { getExercises, State } from '../../state';
import { AthletePageActions } from '../../state/actions';

@Component({
  selector: 'app-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.scss']
})
export class TrainingPageComponent implements OnInit, AfterViewInit {

  exercises$: Observable<Exercise[]>;
  @ViewChild('swiperGallery') swiperGallery: SwiperComponent;

  swiperConfig: SwiperConfigInterface = {
    init: false,
    loop: true,
    preventInteractionOnTransition: false,
    initialSlide: 0, //this one accept a number according to docs
  };

  exercise = [];

  constructor(private readonly dialog: MatDialog,
    private readonly store: Store<State>,
    private readonly snackBar: MatSnackBar,
    private readonly cd: ChangeDetectorRef,
    private readonly ngZone: NgZone) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.exercises$ = this.store.select(getExercises).pipe(
      map(exercises => exercises ? exercises?.filter(exercise => !exercise.completed) : []),
      // tap(() => this.swiperGallery?.directiveRef.update()),
      tap(() => {
        setTimeout(() => {
          this.swiperGallery?.directiveRef?.update();
          this.swiperGallery.directiveRef?.swiper().init();
        }, 0);
      })
    );


    // this.exercises$ = this.store.select(getMyTrainingSuccess).pipe(
    //   tap(myTrainingResponse => {
    //     if (myTrainingResponse?.isFinished) {
    //       this.snackBar.open('Seu treino já foi finalizado :)', '', {

    //       });
    //       return;
    //     }

    //     if (myTrainingResponse?.isStarted) {
    //       this.snackBar.open('Bem vindo de volta :)', '', {

    //       });
    //     }

    //   }),
    //   map(myTrainingResponse => myTrainingResponse?.exercises),
    //   tap(() => this.swiperGallery?.directiveRef.update())
    // );

    this.store.dispatch(AthletePageActions.loadExercises({ trainingType: TrainingTypeEnum.A }));
  }

  onIndexChange(index: number): void {
    // console.log('Swiper index: ', index);
    if (index === 4) {
      this.openModal();
    }
  }

  onSwiperEvent(event: string): void {
    console.log(event);
  }

  openModal(): void {
    // this.dialog.open(SuccessModalComponent);
  }

  onDone(exercise: Exercise): void {
    const currentExercise: Exercise = Object.assign({}, exercise, { completed: true });
    this.store.dispatch(AthletePageActions.jumpExercise({ exercise: currentExercise }));
  }

  /**
   * @description no cenário em que o usuário pule o exercício, será registrado na store que, para o usuário 
   * não completou o exercício especificado
   * @param exercise exercício que o usuário não concluiu
   */
  onJump(exercise: Exercise): void {
    // const currentExercise: Exercise = Object.assign({}, exercise, { completed: false });
    // this.store.dispatch(AthletePageActions.jumpExercise({ exercise: currentExercise }));

    this.swiperGallery.directiveRef.nextSlide();


    // this.swiperGallery.directiveRef.nextSlide(1, false);
  }

  onFinish(exercise: Exercise): void {
    this.swiperGallery.directiveRef.prevSlide();
    // const currentExercise = Object.assign({}, exercise, { completed: true });
    // this.store.dispatch(AthletePageActions.jumpExercise({ exercise: currentExercise }));
  }
}

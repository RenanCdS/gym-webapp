import { CdkStep } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStep, MatVerticalStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { getAvailableExercises, getIsRegistration } from 'src/app/state';
import { RegisterAthleteRequest } from '../../models/api/athletes/register-athlete-request';
import { AthleteService } from '../../services/athlete.service';
import { State } from '../../state';
import { AthletePageActions } from '../../state/actions';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { RegisteredExercise } from 'src/app/core/models/RegisteredExercise';
import { getRegisteredExercises } from 'src/app/state/actions/app-page.actions';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { ExerciseToRegister } from '../../models/api/athletes/exercise-to-register';
import { getTrainingToRegister } from '../../state';
import { UtilsService } from 'src/app/core/services/utils.service';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { registerAthlete, resetExercisesToRegister, updateAthlete } from '../../state/actions/athlete-page.actions';

@Component({
  selector: 'app-athlete-register-page',
  templateUrl: './athlete-register-page.component.html',
  styleUrls: ['./athlete-register-page.component.scss']
})
export class AthleteRegisterPageComponent implements OnInit, OnDestroy {
  @ViewChild('athleteStepper', { static: true }) athleteStepper: MatVerticalStepper;
  @ViewChild('trainingAStep', { static: true }) trainingAStep: MatStep;
  @ViewChild('trainingBStep', { static: true }) trainingBStep: MatStep;
  @ViewChild('trainingCStep', { static: true }) trainingCStep: MatStep;
  @ViewChild('personalDataStep', { static: true }) personalDataStep: MatStep;

  registerAthleteForm: FormGroup;
  trainingForm: FormGroup;
  resetAthleteSub: Subscription;
  isRegistration = true;
  availableExercises$: Observable<RegisteredExercise[]>;
  currentTrainingToRegister$: Observable<{
    trainingA: {
      exercises: ExerciseToRegister[]
    },
    trainingB: {
      exercises: ExerciseToRegister[]
    },
    trainingC: {
      exercises: ExerciseToRegister[]
    }
  }>;

  readonly trainingType = TrainingTypeEnum;

  readonly phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];
  readonly numberMask = createNumberMask({
    prefix: '',
    integerLimit: 3,
    decimalLimit: 2,
    allowDecimal: true,
    decimalSymbol: ','
  });
  readonly ageMask = createNumberMask({
    prefix: '',
    integerLimit: 3,
  });

  constructor(private readonly fb: FormBuilder,
    private readonly store: Store<State>,
    private readonly athleteService: AthleteService,
    private readonly utilsService: UtilsService) { }

  ngOnInit(): void {
    this.currentTrainingToRegister$ = this.store.select(getTrainingToRegister);
    this.store.dispatch(getRegisteredExercises());
    this.availableExercises$ = this.store.select(getAvailableExercises);
    this.resetAthleteSub = this.athleteService.resetAthleteForm$.subscribe(() => {
      this.registerAthleteForm.markAsUntouched();
      this.registerAthleteForm.reset();
      this.registerAthleteForm.updateValueAndValidity();

      this.trainingForm.markAsUntouched();
      this.trainingForm.reset();
      this.trainingForm.updateValueAndValidity();
    });
    this.initializeForm();
    this.intializeTrainingForms();

    this.store.select(getIsRegistration).pipe(
      take(1)
    ).subscribe(({ isRegistration, athleteToUpdate }) => {
      this.isRegistration = isRegistration;
      if (!isRegistration) {
        this.registerAthleteForm.patchValue({
          name: athleteToUpdate.name,
          age: athleteToUpdate.age,
          email: athleteToUpdate.email,
          height: athleteToUpdate.height,
          phone: athleteToUpdate.phone,
          weight: athleteToUpdate.weight,
          password: athleteToUpdate.password
        });
      }
    });
  }

  /**
   * @description validate the personal data of the athlete and goes to the next step in the
   * registration
   * @param nextStep step that will be selected if the data is valid
   */
  validatePersonalData(nextStep: CdkStep): void {
    if (!this.registerAthleteForm.valid) {
      this.registerAthleteForm.markAllAsTouched();
      this.registerAthleteForm.updateValueAndValidity();
      return;
    }

    this.athleteStepper.selected = nextStep;
  }

  addToTraining(trainingType: TrainingTypeEnum): void {
    const trainingForm = (this.trainingForm.controls[`training${trainingType}`] as FormGroup);
    if (!trainingForm.valid) {
      trainingForm.markAllAsTouched();
      trainingForm.updateValueAndValidity();
      return;
    }
    let availableExercises: RegisteredExercise[] = [];
    this.store.select(getAvailableExercises).pipe(
      take(1)
    ).subscribe(exercises => {
      availableExercises = exercises;
    });

    this.store.select(getTrainingToRegister).pipe(
      take(1)
    ).subscribe(
      trainingToRegister => {
        const training = trainingToRegister[`training${trainingType}`];
        const exercises = training.exercises as ExerciseToRegister[];
        const exerciseToRegister: ExerciseToRegister = {
          exerciseId: trainingForm.controls.exerciseId.value,
          exerciseName: availableExercises.find(
            exercise => exercise.exerciseId === trainingForm.controls.exerciseId.value).exerciseName,
          quantity: trainingForm.controls.quantity.value,
          weight: trainingForm.controls.weight.value,
          series: trainingForm.controls.series.value,
          repetions: trainingForm.controls.repetions.value,
        };
        if (exercises.find(exercise =>
          exercise.exerciseId === exerciseToRegister.exerciseId)) {
          this.utilsService.showMessage('O exercício selecionado já foi adicionado, por favor escolha outro exercício');
          return;
        }

        this.store.dispatch(AthletePageActions.addExerciseToRegister(
          { trainingType, exerciseToRegister }
        ));

        trainingForm.reset();
      }
    );
  }

  deleteFromTraining(trainingType: TrainingTypeEnum, exerciseToRemove: ExerciseToRegister): void {
    this.store.dispatch(AthletePageActions.removeExerciseToRegister(
      { trainingType, exerciseToRegister: exerciseToRemove }
    ));
  }

  finalizeRegister(): void {
    let trainingData: {
      trainingA: { exercises: ExerciseToRegister[] },
      trainingB: { exercises: ExerciseToRegister[] },
      trainingC: { exercises: ExerciseToRegister[] },
    };
    this.store.select(getTrainingToRegister).pipe(
      take(1)
    ).subscribe(trainingToRegister => {
      trainingData = trainingToRegister;
    });
    const athleteData = this.getAthleteData();
    const athleteToRegister: RegisterAthleteRequest = {
      roleId: UserRoleEnum.STUDENT,
      ...athleteData,
      trainingA: trainingData.trainingA,
      trainingB: trainingData.trainingB,
      trainingC: trainingData.trainingC,
    };

    if (!this.registerAthleteForm.valid) {
      this.registerAthleteForm.markAllAsTouched();
      this.registerAthleteForm.updateValueAndValidity();
      this.athleteStepper.selected = this.personalDataStep;
      return;
    }

    if (trainingData.trainingA.exercises.length === 0) {
      this.athleteStepper.selected = this.trainingAStep;
      this.utilsService.showMessage('Por favor, adicione ao menos um exercício para o treino A');
      return;
    }

    if (trainingData.trainingB.exercises.length === 0) {
      this.athleteStepper.selected = this.trainingBStep;
      this.utilsService.showMessage('Por favor, adicione ao menos um exercício para o treino B');
      return;
    }

    if (trainingData.trainingC.exercises.length === 0) {
      this.athleteStepper.selected = this.trainingCStep;
      this.utilsService.showMessage('Por favor, adicione ao menos um exercício para o treino C');
      return;
    }
    if (this.isRegistration) {
      this.store.dispatch(registerAthlete({
        athleteToRegister, callbackError: () => {
          this.athleteStepper.selected = this.personalDataStep;
        }
      }));
    } else {
      this.store.dispatch(updateAthlete({
        athleteToRegister, callbackError: () => {
          this.athleteStepper.selected = this.personalDataStep;
        }
      }));
    }

    this.store.dispatch(resetExercisesToRegister());
  }

  /**
   * @description avança para o próximo step após o usuário ter adicionado os exercícios referentes ao treino
   * @param trainingType tipo do treino (A, B, C)
   */
  nextStep(trainingType: TrainingTypeEnum): void {
    let trainingData: {
      trainingA: { exercises: ExerciseToRegister[] },
      trainingB: { exercises: ExerciseToRegister[] },
      trainingC: { exercises: ExerciseToRegister[] },
    };
    this.store.select(getTrainingToRegister).pipe(
      take(1)
    ).subscribe(trainingToRegister => {
      trainingData = trainingToRegister;
    });

    if (trainingData[`training${trainingType}`].exercises.length === 0) {
      this.utilsService.showMessage(`Por favor, selecione pelo menos um exercício ao treino ${trainingType}`);
      return;
    }

    this.athleteStepper.next();
  }

  private getAthleteData(): any {
    const athleteData: Partial<RegisterAthleteRequest> = {
      name: this.registerAthleteForm.controls.name.value,
      age: this.registerAthleteForm.controls.age.value,
      email: this.registerAthleteForm.controls.email.value,
      height: this.registerAthleteForm.controls.height.value,
      weight: this.registerAthleteForm.controls.weight.value,
      phone: this.registerAthleteForm.controls.phone.value,
      password: this.registerAthleteForm.controls.password.value,
    };

    return athleteData;
  }

  private initializeForm(): void {
    this.registerAthleteForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  private intializeTrainingForms(): void {
    this.trainingForm = this.fb.group({
      trainingA: this.fb.group({
        exerciseId: ['', Validators.required],
        weight: ['', Validators.required],
        quantity: ['', Validators.required],
        series: ['', Validators.required],
        repetions: ['', Validators.required]
      }),
      trainingB: this.fb.group({
        exerciseId: ['', Validators.required],
        weight: ['', Validators.required],
        quantity: ['', Validators.required],
        series: ['', Validators.required],
        repetions: ['', Validators.required]
      }),
      trainingC: this.fb.group({
        exerciseId: ['', Validators.required],
        weight: ['', Validators.required],
        quantity: ['', Validators.required],
        series: ['', Validators.required],
        repetions: ['', Validators.required]
      })
    });
  }

  ngOnDestroy(): void {
    this.resetAthleteSub.unsubscribe();
  }
}

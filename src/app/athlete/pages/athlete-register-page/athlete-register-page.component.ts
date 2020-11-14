import { CdkStep } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { getAvailableExercises, getIsRegistration } from 'src/app/state';
import { RegisterAthleteRequest } from '../../models/api/athletes/register-athlete-register';
import { AthleteService } from '../../services/athlete.service';
import { State } from '../../state';
import { AthletePageActions } from '../../state/actions';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { RegisteredExercise } from 'src/app/core/models/RegisteredExercise';
import { getRegisteredExercises } from 'src/app/state/actions/app-page.actions';

@Component({
  selector: 'app-athlete-register-page',
  templateUrl: './athlete-register-page.component.html',
  styleUrls: ['./athlete-register-page.component.scss']
})
export class AthleteRegisterPageComponent implements OnInit, OnDestroy {
  @ViewChild('athleteStepper', { static: true }) athleteStepper: MatVerticalStepper;
  registerAthleteForm: FormGroup;
  resetAthleteSub: Subscription;
  isRegistration = true;
  availableExercises$: Observable<RegisteredExercise[]>;

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
    private readonly athleteService: AthleteService) { }

  ngOnInit(): void {
    this.store.dispatch(getRegisteredExercises());
    this.availableExercises$ = this.store.select(getAvailableExercises);
    this.resetAthleteSub = this.athleteService.resetAthleteForm$.subscribe(() => {
      this.registerAthleteForm.markAsUntouched();
      this.registerAthleteForm.reset();
      this.registerAthleteForm.updateValueAndValidity();
    });
    this.initializeForm();

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

  registerAthlete(): void {
    if (!this.registerAthleteForm.valid) {
      this.registerAthleteForm.markAllAsTouched();
      this.registerAthleteForm.updateValueAndValidity();
      return;
    }

    const registerAthleteRequest: Partial<RegisterAthleteRequest> = {
      name: this.registerAthleteForm.controls.name.value,
      age: this.registerAthleteForm.controls.age.value,
      email: this.registerAthleteForm.controls.email.value,
      height: this.registerAthleteForm.controls.height.value,
      weight: this.registerAthleteForm.controls.weight.value,
      phone: this.registerAthleteForm.controls.phone.value,
      password: this.registerAthleteForm.controls.password.value,
    };

    this.store.dispatch(AthletePageActions.registerAthlete({ athleteRequest: registerAthleteRequest }));
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

  ngOnDestroy(): void {
    this.resetAthleteSub.unsubscribe();
  }

}

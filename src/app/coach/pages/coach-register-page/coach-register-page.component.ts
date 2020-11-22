import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { ageMask, numberMask, phoneMask } from 'src/app/core/constants/masks';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { PostCadasterCoachRequest } from '../../models/api/post-cadaster-coach-request';
import { getError, getIsRegistration, State } from '../../state';
import { CoachPageActions } from '../../state/actions';
import { cadasterCoach, updateCoach } from '../../state/actions/coach-page.actions';

@Component({
  selector: 'app-coach-register-page',
  templateUrl: './coach-register-page.component.html',
  styleUrls: ['./coach-register-page.component.scss']
})
export class CoachRegisterPageComponent implements OnInit, OnDestroy {

  coachCadasterForm: FormGroup;
  numberMask = numberMask;
  errorSubscription: Subscription;
  ageMask = ageMask;
  phoneMask = phoneMask;
  isRegistration = true;

  constructor(private readonly fb: FormBuilder,
    private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.coachCadasterForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.store.select(getIsRegistration).pipe(
      take(1)
    ).subscribe(({ isRegistration, coachToUpdate }) => {
      this.isRegistration = isRegistration;
      if (!isRegistration) {
        this.coachCadasterForm.patchValue({
          name: coachToUpdate.name,
          age: coachToUpdate.age,
          email: coachToUpdate.email,
          phone: coachToUpdate.phone,
          weight: coachToUpdate.weight,
          height: coachToUpdate.height,
          password: coachToUpdate.password,
        });
      }
    });

    this.errorSubscription = this.store.select(getError).pipe(
      skip(1)
    ).subscribe(error => {
      alert('error');
      if (!error) {
        this.coachCadasterForm.reset();
      }
    });
  }

  cadasterCoach(): void {
    if (!this.coachCadasterForm.valid) {
      this.coachCadasterForm.markAllAsTouched();
      this.coachCadasterForm.updateValueAndValidity();
      return;
    }

    const cadasterCoachRequest: PostCadasterCoachRequest = {
      roleId: UserRoleEnum.TEACHER,
      name: this.coachCadasterForm.controls.name.value,
      age: this.coachCadasterForm.controls.age.value,
      email: this.coachCadasterForm.controls.email.value,
      height: this.coachCadasterForm.controls.height.value,
      weight: this.coachCadasterForm.controls.weight.value,
      phone: this.coachCadasterForm.controls.phone.value,
      password: this.coachCadasterForm.controls.password.value
    };

    this.store.dispatch(cadasterCoach({ coach: cadasterCoachRequest, callback: () => this.coachCadasterForm.reset() }));
  }

  updateCoach(): void {
    if (!this.coachCadasterForm.valid) {
      this.coachCadasterForm.markAllAsTouched();
      this.coachCadasterForm.updateValueAndValidity();
      return;
    }

    const cadasterCoachRequest: Partial<PostCadasterCoachRequest> = {
      roleId: UserRoleEnum.TEACHER,
      name: this.coachCadasterForm.controls.name.value,
      age: this.coachCadasterForm.controls.age.value,
      email: this.coachCadasterForm.controls.email.value,
      height: this.coachCadasterForm.controls.height.value,
      weight: this.coachCadasterForm.controls.weight.value,
      phone: this.coachCadasterForm.controls.phone.value,
      password: this.coachCadasterForm.controls.password.value
    };

    this.store.dispatch(updateCoach({ coach: cadasterCoachRequest, callback: () => this.coachCadasterForm.reset() }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(CoachPageActions.cadasterCoachFlag());
    this.errorSubscription.unsubscribe();
  }

}

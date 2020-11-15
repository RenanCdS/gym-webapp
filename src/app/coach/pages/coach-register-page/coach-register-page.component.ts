import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ageMask, numberMask, phoneMask } from 'src/app/core/constants/masks';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { PostCadasterCoachRequest } from '../../models/api/post-cadaster-coach-request';
import { getError, State } from '../../state';
import { cadasterCoach } from '../../state/actions/coach-page.actions';

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

  constructor(private readonly fb: FormBuilder,
    private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.coachCadasterForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      password: ['', [Validators.required]],
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

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

}

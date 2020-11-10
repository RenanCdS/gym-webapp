import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterAthleteRequest } from '../../models/api/athletes/register-athlete-register';
import { State } from '../../state';
import { AthletePageActions } from '../../state/actions';

@Component({
  selector: 'app-athlete-register-page',
  templateUrl: './athlete-register-page.component.html',
  styleUrls: ['./athlete-register-page.component.scss']
})
export class AthleteRegisterPageComponent implements OnInit {

  registerAthleteForm: FormGroup;
  constructor(private readonly fb: FormBuilder,
    private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.initializeForm();
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

    this.store.dispatch(AthletePageActions.registerAthlete({ athleteRequest: registerAthleteRequest, form: this.registerAthleteForm }));
  }

  private initializeForm(): void {
    this.registerAthleteForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}

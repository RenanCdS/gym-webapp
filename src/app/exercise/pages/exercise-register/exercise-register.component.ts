import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise-register',
  templateUrl: './exercise-register.component.html',
  styleUrls: ['./exercise-register.component.scss']
})
export class ExerciseRegisterComponent implements OnInit {

  exerciseRegisterForm: FormGroup;
  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.exerciseRegisterForm = this.fb.group({
      name: this.fb.control('', [Validators.required])
    });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { getIsExerciseRegistration, State } from 'src/app/state';
import { AppPageActions } from 'src/app/state/actions';
import { registerExercise, updateExerciseBack } from 'src/app/state/actions/app-page.actions';

@Component({
  selector: 'app-exercise-register',
  templateUrl: './exercise-register.component.html',
  styleUrls: ['./exercise-register.component.scss']
})
export class ExerciseRegisterComponent implements OnInit, OnDestroy {

  exerciseRegisterForm: FormGroup;
  imageUrl: string | ArrayBuffer = '';
  exerciseData: FormData;
  fileImage: any;
  showFileError = false;
  isRegistration = true;
  exerciseToUpdateId = null;

  constructor(private readonly fb: FormBuilder,
    private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.exerciseData = new FormData();
    this.initializeForm();
    this.store.select(getIsExerciseRegistration).pipe(
      take(1)
    ).subscribe(
      {
        next: ({ isRegistration, exerciseToUpdate }) => {
          this.isRegistration = isRegistration;
          this.exerciseToUpdateId = exerciseToUpdate.exerciseId;
          if (!isRegistration) {
            this.exerciseRegisterForm.controls.name.setValue(exerciseToUpdate.exerciseName);
          }
        }
      }
    );
  }

  onFileDrop(file: any) {
    this.fileImage = null;
    const reader = new FileReader();
    file[0].fileEntry.file(fileResult => {
      reader.readAsDataURL(fileResult);
      this.fileImage = fileResult;
      reader.onload = () => {
        this.imageUrl = reader.result;

        if (this.imageUrl) {
          this.showFileError = false;
        }
      };
    });
  }

  registerExercise(): void {
    if (!this.imageUrl) {
      this.fileImage = null;
      this.imageUrl = '';
      this.showFileError = true;
      return;
    }
    this.showFileError = false;
    if (!this.exerciseRegisterForm.valid) {
      this.exerciseRegisterForm.markAllAsTouched();
      this.fileImage = null;
      this.exerciseRegisterForm.updateValueAndValidity();
      return;
    }

    const exerciseData: FormData = new FormData();
    exerciseData.append('exerciseName', this.exerciseRegisterForm.controls.name.value);
    exerciseData.append('file', this.fileImage);

    this.store.dispatch(registerExercise({
      exerciseData, callback: () => {
        this.exerciseRegisterForm.reset();
        this.imageUrl = '';
        this.fileImage = null;
      }
    }));
  }

  updateExercise(): void {
    if (!this.imageUrl) {
      this.fileImage = null;
      this.imageUrl = '';
      this.showFileError = true;
      return;
    }
    this.showFileError = false;
    if (!this.exerciseRegisterForm.valid) {
      this.exerciseRegisterForm.markAllAsTouched();
      this.fileImage = null;
      this.exerciseRegisterForm.updateValueAndValidity();
      return;
    }

    const exerciseData: FormData = new FormData();
    exerciseData.append('exerciseName', this.exerciseRegisterForm.controls.name.value);
    exerciseData.append('file', this.fileImage);

    this.store.dispatch(updateExerciseBack({
      exerciseData, exerciseId: this.exerciseToUpdateId, callback: () => {
        this.exerciseRegisterForm.reset();
        this.imageUrl = '';
        this.fileImage = null;
      }
    }));
  }

  private initializeForm(): void {
    this.exerciseRegisterForm = this.fb.group({
      name: this.fb.control('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(AppPageActions.createExercise());
  }

}

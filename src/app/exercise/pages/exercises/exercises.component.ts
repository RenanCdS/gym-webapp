import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { RegisteredExercise } from 'src/app/core/models/RegisteredExercise';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { getAvailableExercises } from 'src/app/state';
import { getRegisteredExercises, updateExercise } from 'src/app/state/actions/app-page.actions';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  @ViewChild('confirmationModal', { static: true }) confirmationModal: TemplateRef<ConfirmationModalComponent>;

  availableExercises$: Observable<RegisteredExercise[]>;

  constructor(private readonly dialog: MatDialog,
    private readonly store: Store<any>,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.availableExercises$ = this.store.select(getAvailableExercises).pipe(
      tap(exercises => {
        if (exercises === null) {
          this.store.dispatch(getRegisteredExercises());
        }
      })
    );
  }

  openConfirmationModal(): void {
    this.dialog.open(this.confirmationModal);
  }

  updateExercise(exercise: RegisteredExercise): void {
    this.store.dispatch(updateExercise({ exerciseToUpdate: exercise }));
    this.router.navigate(['/exercicio/editar']);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

}

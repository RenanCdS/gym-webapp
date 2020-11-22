import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Coach } from '../../models/coach';
import { State } from '../../state';
import { CoachPageActions } from '../../state/actions';
import { deleteCoach, getCoaches as getCoachesAction } from '../../state/actions/coach-page.actions';
import { getCoaches } from '../../state/index';

@Component({
  selector: 'app-coach-list-page',
  templateUrl: './coach-list-page.component.html',
  styleUrls: ['./coach-list-page.component.scss']
})
export class CoachListPageComponent implements OnInit {

  coaches$: Observable<Coach[]>;
  coachToBeDeleted = null;
  constructor(private readonly snackBar: MatSnackBar,
    private readonly store: Store<State>,
    private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(getCoachesAction());
    this.coaches$ = this.store.select(getCoaches);
  }

  openSnackbar(message?: string): void {
    this.snackBar.open(message || 'Aluno bonificado com sucesso!', '', {
      verticalPosition: 'top'
    });
  }

  updateCoach(coach: Coach): void {
    this.store.dispatch(CoachPageActions.updateCoachFlag({ coach }));
  }

  deleteCoach(): void {
    this.store.dispatch(deleteCoach({ coach: this.coachToBeDeleted }));
    this.closeModal();
  }

  openModal(modal: TemplateRef<any>): void {
    this.dialog.open(modal);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

}

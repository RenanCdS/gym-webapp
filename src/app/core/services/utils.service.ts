import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state';
import { AppPageActions } from 'src/app/state/actions';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private readonly store: Store<State>,
    private readonly snackBar: MatSnackBar) { }

  startLoading(): void {
    this.store.dispatch(AppPageActions.startLoading());
  }

  finishLoading(): void {
    this.store.dispatch(AppPageActions.finishLoading());
  }

  showError(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state';
import { AppPageActions } from 'src/app/state/actions';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private readonly store: Store<State>) { }

  startLoading(): void {
    this.store.dispatch(AppPageActions.startLoading());
  }

  finishLoading(): void {
    this.store.dispatch(AppPageActions.finishLoading());
  }
}

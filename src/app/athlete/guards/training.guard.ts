import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getIsFinished, getIsStarted, State } from '../state';

// TODO: Implementar lógica
@Injectable()
export class TrainingGuard implements CanActivate {
  constructor(private readonly store: Store<State>,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar) { }

  canActivate(): Observable<boolean> {
    return combineLatest([this.store.select(getIsFinished), this.store.select(getIsStarted)]).pipe(
      map(([isFinished, isStarted]) => {
        if (isFinished) {
          this.router.navigate(['home']);
          this.snackBar.open('Seu treino diário já foi concluído :)');
          return false;
        }

        if (isStarted) {
          return true;
        }
        return true;
      })
    );
  }
}

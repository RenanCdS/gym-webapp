import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AthletePageActions } from '../athlete/state/actions';
import { allMenuItems, MENU_OPTIONS, USER_MENU } from '../core/constants/constants';
import { MenuItem } from '../core/models/MenuItem';
import { SessionService } from '../core/services/session.service';
import { getLoading, getUserRole, State } from '../state';
import { AppPageActions } from '../state/actions';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
})
export class BasePageComponent implements OnInit, OnDestroy {
  menuList: MenuItem[];
  isLoading$: Observable<boolean>;
  storeSub: Subscription;
  constructor(private readonly store: Store<State>,
    private readonly sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.store.dispatch(AppPageActions.indetifyUserRole());
    this.storeSub = this.store.select(getUserRole).subscribe(userRole => {
      this.menuList = MENU_OPTIONS.get(userRole);
      // usado nos testes automatizados
      if (!environment.validateToken) {
        this.menuList = allMenuItems;
      }
      if (userRole) {
        this.sessionService.setStorage(USER_MENU, JSON.stringify(this.menuList));
      } else {
        this.menuList = JSON.parse(localStorage.getItem('user_menu'));
      }
    });

    this.isLoading$ = this.store.select(getLoading).pipe(delay(100));
  }

  exit(): void {
    this.store.dispatch(AppPageActions.exit());
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}

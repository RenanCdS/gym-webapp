import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MENU_OPTIONS, USER_MENU } from '../core/constants/constants';
import { MenuItem } from '../core/models/MenuItem';
import { SessionService } from '../core/services/session.service';
import { getLoading, getUserRole, State } from '../state';
import { AppPageActions } from '../state/actions';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
})
export class BasePageComponent implements OnInit {
  menuList: MenuItem[];
  isLoading$: Observable<boolean>;
  constructor(private readonly store: Store<State>,
    private readonly sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.store.dispatch(AppPageActions.indetifyUserRole());
    this.store.select(getUserRole).subscribe(userRole => {
      this.menuList = MENU_OPTIONS.get(userRole);
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
}

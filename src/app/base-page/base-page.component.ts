import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MENU_OPTIONS, USER_MENU } from '../core/constants/constants';
import { MenuItem } from '../core/models/MenuItem';
import { SessionService } from '../core/services/session.service';
import { getUserRole } from '../state';
import { AppPageActions } from '../state/actions';
import { State } from '../state/app.reducer';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
})
export class BasePageComponent implements OnInit {
  menuList: MenuItem[];
  constructor(private readonly store: Store<State>,
    private readonly sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.store.dispatch(AppPageActions.indetifyUserRole());
    this.store.select(getUserRole).subscribe(userRole => {
      this.menuList = MENU_OPTIONS.get(userRole);
      if (userRole) {
        this.sessionService.setStorage(USER_MENU, JSON.stringify(this.menuList));
      }
    });
  }

  exit(): void {
    this.store.dispatch(AppPageActions.exit());
  }
}

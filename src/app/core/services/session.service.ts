import { Injectable } from '@angular/core';
import { ACCESS_TOKEN_KEY } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getAuthToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}

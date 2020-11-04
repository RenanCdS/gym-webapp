import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class TrainingGuard implements CanActivate {
  canActivate(): boolean {
    throw new Error('Method not implemented.');
  }

}

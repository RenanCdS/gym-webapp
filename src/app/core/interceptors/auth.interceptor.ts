import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('login')) {
      const token = localStorage.getItem('access_token');
      const clone = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      return next.handle(clone);
    }

    return next.handle(req);
  }
}

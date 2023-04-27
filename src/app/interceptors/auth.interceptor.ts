import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, throwError, switchMap } from 'rxjs';
import { IToken } from 'src/interface/IToken';
import { AuthService } from '../components/services/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken: string = '';
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req: HttpRequest<unknown> = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor.accessToken}`
      }
    })

    return next.handle(req).pipe(catchError((err:HttpErrorResponse) => {
      if (err.status === 401){
        // this.hasRefreshed = true;
        return this.authService.refresh().pipe(
          switchMap((res:any) => {
            AuthInterceptor.accessToken = res.accessToken;
            localStorage.setItem("token", AuthInterceptor.accessToken);
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${AuthInterceptor.accessToken}`
              }
            }));
          })
        )
      }
      return throwError(() => err);
    }));
  }
}

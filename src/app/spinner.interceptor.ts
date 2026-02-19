import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { InterceptorService } from './shared/services/interceptor.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private _auth: InterceptorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    

    this._auth.setAuthIterceptor(true)
    const modifiedRequest = request.clone({

      setHeaders:{
        "Auth": "TOken from LS"
      }
    })
    
    
    return next.handle(modifiedRequest).pipe(
      delay(500),
      finalize(()=>{
           this._auth.setAuthIterceptor(false)

      })
    )


  }
}

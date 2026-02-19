import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  interceptorSub$:  BehaviorSubject<boolean>= new BehaviorSubject(false);
  interceptorObs$: Observable<boolean> = this.interceptorSub$.asObservable()
  setAuthIterceptor(status: boolean){
   this.interceptorSub$.next(status)
  }
}
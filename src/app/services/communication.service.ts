import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {


  constructor() { }

  private projectGetFunctionCall = new Subject<void>();
  projectGetFunctionCall$ = this.projectGetFunctionCall.asObservable();

  triggerProjectGetList(): void {
    this.projectGetFunctionCall.next();
  }
}

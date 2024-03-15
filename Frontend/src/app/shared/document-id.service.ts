import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentIdService {

  private _createdDocumentIdSubject = new BehaviorSubject<string | undefined>(undefined);
  createdDocumentId$ = this._createdDocumentIdSubject.asObservable();

  setCreatedDocumentId(id: string | undefined) {
    this._createdDocumentIdSubject.next(id);
  }
}

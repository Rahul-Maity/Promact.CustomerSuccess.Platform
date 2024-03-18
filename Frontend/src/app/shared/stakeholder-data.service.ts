import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stakeholder } from '../models/Stakeholder';
@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {
  private stakeholderDataSubject = new BehaviorSubject<Stakeholder | null>(null);
  stakeholderData$ = this.stakeholderDataSubject.asObservable();

  updatestakeholderData(stakeholder: Stakeholder) {
    this.stakeholderDataSubject.next(stakeholder);
  }

  constructor() { }
}


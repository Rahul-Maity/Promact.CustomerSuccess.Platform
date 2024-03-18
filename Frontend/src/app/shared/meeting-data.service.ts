import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meeting } from '../models/Meeting';
@Injectable({
  providedIn: 'root'
})
export class MeetingDataService {
  private MeetingDataSubject = new BehaviorSubject<Meeting | null>(null);
  MeetingDataData$ = this.MeetingDataSubject.asObservable();
    updateMeetingData(momsMeeting: Meeting) {
    this.MeetingDataSubject.next(momsMeeting);
  }
  constructor() { }
}




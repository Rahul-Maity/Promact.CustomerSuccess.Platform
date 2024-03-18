import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Feedback } from '../models/Feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
    private FeedbackDataSubject = new BehaviorSubject<Feedback | null>(null);
  FeedbackDataData$ = this.FeedbackDataSubject.asObservable();
    updateFeedbackData(clientFeedback: Feedback) {
    this.FeedbackDataSubject.next(clientFeedback);
  }
  constructor() { }
}




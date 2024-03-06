import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { Feedback } from '../models/Feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}client-feedback`);
  }

  createFeedback(feedbackData: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}client-feedback`, feedbackData);
  }

  getFeedbackById(id: string): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.baseUrl}client-feedback/${id}`);
  }

  updateFeedback(id: string, feedbackData: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.baseUrl}client-feedback/${id}`, feedbackData);
  }

  deleteFeedback(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}client-feedback/${id}`);
  }
}

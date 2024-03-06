import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { Meeting } from '../models/Meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}meeting-minute`);
  }

  createMeeting(meetingData: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.baseUrl}meeting-minute`, meetingData);
  }

  getMeetingById(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseUrl}meeting-minute/${id}`);
  }

  updateMeeting(id: string, meetingData: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.baseUrl}meeting-minute/${id}`, meetingData);
  }

  deleteMeeting(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}meeting-minute/${id}`);
  }
}

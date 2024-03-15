import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { Sprint } from '../models/Sprint';
@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.baseUrl}sprint`);
  }

  createSprint(sprintData: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.baseUrl}sprint`, sprintData);
  }

  getSprintById(id: string): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.baseUrl}sprint/${id}`);
  }

  updateSprint(id: string, sprintData: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.baseUrl}sprint/${id}`, sprintData);
  }

  deleteSprint(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}sprint/${id}`);
  }
}

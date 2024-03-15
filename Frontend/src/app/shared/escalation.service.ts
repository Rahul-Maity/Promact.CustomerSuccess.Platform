import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { Escalation } from '../models/Escalation';
@Injectable({
  providedIn: 'root'
})
export class EscalationService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllEscalations(): Observable<Escalation[]> {
    return this.http.get<Escalation[]>(`${this.baseUrl}escalation-matrix`);
  }

  createEscalation(escalationData: Escalation): Observable<Escalation> {
    return this.http.post<Escalation>(`${this.baseUrl}escalation-matrix`, escalationData);
  }

  getEscalationById(id: string): Observable<Escalation> {
    return this.http.get<Escalation>(`${this.baseUrl}escalation-matrix/${id}`);
  }

  updateEscalation(id: string, escalationData: Escalation): Observable<Escalation> {
    return this.http.put<Escalation>(`${this.baseUrl}escalation-matrix/${id}`, escalationData);
  }

  deleteEscalation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}escalation-matrix/${id}`);
  }
}

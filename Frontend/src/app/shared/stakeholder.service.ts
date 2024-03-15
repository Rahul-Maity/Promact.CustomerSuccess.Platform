import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stakeholder } from '../models/Stakeholder';
import { apiEndPoint } from '../apiEndPoint';
@Injectable({
  providedIn: 'root'
})
export class StakeholderService {

  private baseUrl: string;
  stakeholderCreated: any;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllStakeholders(): Observable<Stakeholder[]> {
    return this.http.get<Stakeholder[]>(`${this.baseUrl}stakeholder`);
  }

  createStakeholder(stakeholderData: Stakeholder): Observable<Stakeholder> {
    return this.http.post<Stakeholder>(`${this.baseUrl}stakeholder`, stakeholderData);
  }

  getStakeholderById(id: string): Observable<Stakeholder> {
    return this.http.get<Stakeholder>(`${this.baseUrl}stakeholder/${id}`);
  }

  updateStakeholder(id: string, stakeholderData: Stakeholder): Observable<Stakeholder> {
    return this.http.put<Stakeholder>(`${this.baseUrl}stakeholder/${id}`, stakeholderData);
  }

  deleteStakeholder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}stakeholder/${id}`);
  }
}

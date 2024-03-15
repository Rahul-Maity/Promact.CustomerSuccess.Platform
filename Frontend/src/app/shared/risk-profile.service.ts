import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { RiskProfile } from '../models/RiskProfile';
@Injectable({
  providedIn: 'root'
})
export class RiskProfileService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllRiskProfiles(): Observable<RiskProfile[]> {
    return this.http.get<RiskProfile[]>(`${this.baseUrl}risk-profile`);
  }

  createRiskProfile(riskProfileData: RiskProfile): Observable<RiskProfile> {
    return this.http.post<RiskProfile>(`${this.baseUrl}risk-profile`, riskProfileData);
  }

  getRiskProfileById(id: string): Observable<RiskProfile> {
    return this.http.get<RiskProfile>(`${this.baseUrl}risk-profile/${id}`);
  }

  updateRiskProfile(id: string, riskProfileData: RiskProfile): Observable<RiskProfile> {
    return this.http.put<RiskProfile>(`${this.baseUrl}risk-profile/${id}`, riskProfileData);
  }

  deleteRiskProfile(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}risk-profile/${id}`);
  }
}

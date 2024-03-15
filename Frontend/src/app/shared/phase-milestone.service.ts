import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { PhaseMileStone } from '../models/PhaseMilestone';
@Injectable({
  providedIn: 'root'
})
export class PhaseMilestoneService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); // Assuming apiEndPoint() returns the base URL for your backend API
  }

  getAllPhaseMileStones(): Observable<PhaseMileStone[]> {
    return this.http.get<PhaseMileStone[]>(`${this.baseUrl}phase-milestone`);
  }

  createPhaseMileStone(phaseMileStoneData: PhaseMileStone): Observable<PhaseMileStone> {
    return this.http.post<PhaseMileStone>(`${this.baseUrl}phase-milestone`, phaseMileStoneData);
  }

  getPhaseMileStoneById(id: string): Observable<PhaseMileStone> {
    return this.http.get<PhaseMileStone>(`${this.baseUrl}phase-milestone/${id}`);
  }

  updatePhaseMileStone(id: string, phaseMileStoneData: PhaseMileStone): Observable<PhaseMileStone> {
    return this.http.put<PhaseMileStone>(`${this.baseUrl}phase-milestone/${id}`, phaseMileStoneData);
  }

  deletePhaseMileStone(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}phase-milestone/${id}`);
  }
}

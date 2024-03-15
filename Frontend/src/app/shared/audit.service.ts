import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { Audit } from '../models/Audit';
@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllAudits(): Observable<Audit[]> {
    return this.http.get<Audit[]>(`${this.baseUrl}audit-history`);
  }

  createAudit(auditData: Audit): Observable<Audit> {
    return this.http.post<Audit>(`${this.baseUrl}audit-history`, auditData);
  }

  getAuditById(id: string): Observable<Audit> {
    return this.http.get<Audit>(`${this.baseUrl}audit-history/${id}`);
  }

  updateAudit(id: string, auditData: Audit): Observable<Audit> {
    return this.http.put<Audit>(`${this.baseUrl}audit-history/${id}`, auditData);
  }

  deleteAudit(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}audit-history/${id}`);
  }


}

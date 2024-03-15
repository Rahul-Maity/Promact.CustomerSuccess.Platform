import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { Version } from '../models/Version';
@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllVersions(): Observable<Version[]> {
    return this.http.get<Version[]>(`${this.baseUrl}document-version`);
  }

  createVersion(versionData: Version): Observable<Version> {
    return this.http.post<Version>(`${this.baseUrl}document-version`, versionData);
  }

  getVersionById(id: string): Observable<Version> {
    return this.http.get<Version>(`${this.baseUrl}document-version/${id}`);
  }

  updateVersion(id: string, versionData: Version): Observable<Version> {
    return this.http.put<Version>(`${this.baseUrl}document-version/${id}`, versionData);
  }

  deleteVersion(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}document-version/${id}`);
  }
}

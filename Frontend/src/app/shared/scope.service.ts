import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { Scope } from '../models/Scope';
@Injectable({
  providedIn: 'root'
})
export class ScopeService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllScopes(): Observable<Scope[]> {
    return this.http.get<Scope[]>(`${this.baseUrl}scope`);
  }

  createScope(scopeData: Scope): Observable<Scope> {
    return this.http.post<Scope>(`${this.baseUrl}scope`, scopeData);
  }

  getScopeById(id: string): Observable<Scope> {
    return this.http.get<Scope>(`${this.baseUrl}scope/${id}`);
  }

  updateScope(id: string, scopeData: Scope): Observable<Scope> {
    return this.http.put<Scope>(`${this.baseUrl}scope/${id}`, scopeData);
  }

  deleteScope(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}scope/${id}`);
  }
}

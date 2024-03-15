import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../models/Budget';
import { apiEndPoint } from '../apiEndPoint';
@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.baseUrl}project-budget`);
  }

  createBudget(budgetData: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.baseUrl}project-budget`, budgetData);
  }

  getBudgetById(id: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}project-budget/${id}`);
  }

  updateBudget(id: string, budgetData: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}project-budget/${id}`, budgetData);
  }

  deleteBudget(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-budget/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { ResourceAllocation } from '../models/ResourceAllocation';
@Injectable({
  providedIn: 'root'
})
export class ResourceAllocationService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllResourceAllocations(): Observable<ResourceAllocation[]> {
    return this.http.get<ResourceAllocation[]>(`${this.baseUrl}project-resources`);
  }

  createResourceAllocation(resourceAllocation: ResourceAllocation): Observable<ResourceAllocation> {
    return this.http.post<ResourceAllocation>(`${this.baseUrl}project-resources`, resourceAllocation);
  }

  getResourceAllocationById(id: string): Observable<ResourceAllocation> {
    return this.http.get<ResourceAllocation>(`${this.baseUrl}project-resources/${id}`);
  }

  updateResourceAllocation(id: string, resourceAllocation: ResourceAllocation): Observable<ResourceAllocation> {
    return this.http.put<ResourceAllocation>(`${this.baseUrl}project-resources/${id}`, resourceAllocation);
  }

  deleteResourceAllocation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-resources/${id}`);
  }


}

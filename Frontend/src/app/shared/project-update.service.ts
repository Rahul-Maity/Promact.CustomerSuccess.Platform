import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { ProjectUpdate } from '../models/ProjectUpdate';
@Injectable({
  providedIn: 'root'
})
export class ProjectUpdateService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllProjectUpdates(): Observable<ProjectUpdate[]> {
    return this.http.get<ProjectUpdate[]>(`${this.baseUrl}project-update`);
  }

  createProjectUpdate(projectUpdateData: ProjectUpdate): Observable<ProjectUpdate> {
    return this.http.post<ProjectUpdate>(`${this.baseUrl}project-update`, projectUpdateData);
  }

  getProjectUpdateById(id: string): Observable<ProjectUpdate> {
    return this.http.get<ProjectUpdate>(`${this.baseUrl}project-update/${id}`);
  }

  updateProjectUpdate(id: string, projectUpdateData: ProjectUpdate): Observable<ProjectUpdate> {
    return this.http.put<ProjectUpdate>(`${this.baseUrl}project-update/${id}`, projectUpdateData);
  }

  deleteProjectUpdate(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-update/${id}`);
  }
}

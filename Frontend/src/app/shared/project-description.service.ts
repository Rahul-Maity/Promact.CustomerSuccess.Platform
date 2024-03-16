import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { ProjectDescription } from '../models/ProjectDescription';
@Injectable({
  providedIn: 'root'
})
export class ProjectDescriptionService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }



  getAllProjectDescriptions(): Observable<ProjectDescription[]> {
    return this.http.get<ProjectDescription[]>(`${this.baseUrl}project-description`);
  }

  createProjectDescription(projectDescriptionData: ProjectDescription): Observable<ProjectDescription> {
    return this.http.post<ProjectDescription>(`${this.baseUrl}project-description`, projectDescriptionData);
  }

  getProjectDescriptionById(projectId: string): Observable<ProjectDescription> {
    return this.http.get<ProjectDescription>(`${this.baseUrl}project-description/${projectId}`);
  }

  updateProjectDescription(projectId: string, projectDescriptionData: ProjectDescription): Observable<ProjectDescription> {
    return this.http.put<ProjectDescription>(`${this.baseUrl}project-description/${projectId}`, projectDescriptionData);
  }

  deleteProjectDescription(projectId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-description/${projectId}`);
  }
}

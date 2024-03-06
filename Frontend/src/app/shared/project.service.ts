import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiEndPoint';
import { Project } from '../models/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); // Assuming apiEndPoint() returns the base URL for your backend API
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}project`);
  }

  createProject(projectData: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}project`, projectData);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}project/${id}`);
  }

  updateProject(id: string, projectData: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}project/${id}`, projectData);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project/${id}`);
  }

}

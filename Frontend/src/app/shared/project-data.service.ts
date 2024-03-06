import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  private projectDataSubject = new BehaviorSubject<Project | null>(null);
  projectData$ = this.projectDataSubject.asObservable();

  updateProjectData(project: Project) {
    this.projectDataSubject.next(project);
  }
  constructor() { }
}

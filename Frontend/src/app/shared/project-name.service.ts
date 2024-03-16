import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectNameService {
  private projectNameSubject = new BehaviorSubject<string>('');
  constructor() { }
  setProjectName(projectName: string) {
    this.projectNameSubject.next(projectName);
  }
  getProjectName() {
    return this.projectNameSubject.asObservable();
  }
}

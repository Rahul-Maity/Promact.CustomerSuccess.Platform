import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApprovedTeam } from '../models/approvedTeam';

@Injectable({
  providedIn: 'root'
})
export class ApprovedDataService {
  private ApprovedDataSubject = new BehaviorSubject<ApprovedTeam | null>(null);
  ApprovedDataData$ = this.ApprovedDataSubject.asObservable();
    updateProjectData(approved: ApprovedTeam) {
    this.ApprovedDataSubject.next(approved);
  }
  constructor() { }
}


// // import { Injectable } from '@angular/core';
// import { Project } from '../models/project';
// import { BehaviorSubject } from 'rxjs';
// import { Stakeholder } from '../models/Stakeholder';
// @Injectable({
//   providedIn: 'root'
// })
// export class ProjectDataService {
//   private projectDataSubject = new BehaviorSubject<Project | null>(null);
//   projectData$ = this.projectDataSubject.asObservable();

//   updateProjectData(project: Project) {
//     this.projectDataSubject.next(project);
//   }
//   constructor() { }
// }

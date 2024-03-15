import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stakeholder } from '../models/Stakeholder';
@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {
  private stakeholderDataSubject = new BehaviorSubject<Stakeholder | null>(null);
  stakeholderData$ = this.stakeholderDataSubject.asObservable();

  updatestakeholderData(stakeholder: Stakeholder) {
    this.stakeholderDataSubject.next(stakeholder);
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

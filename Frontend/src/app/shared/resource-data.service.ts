import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResourceAllocation } from '../models/ResourceAllocation';
@Injectable({
  providedIn: 'root'
})
export class ResourceDataService {
  private ResourceDataSubject = new BehaviorSubject<ResourceAllocation | null>(null);
  ResourceDataData$ = this.ResourceDataSubject.asObservable();
    updateProjectData(resource: ResourceAllocation) {
    this.ResourceDataSubject.next(resource);
  }
  constructor() { }
}









// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { ApprovedTeam } from '../models/approvedTeam';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApprovedDataService {
//   private ApprovedDataSubject = new BehaviorSubject<ApprovedTeam | null>(null);
//   ApprovedDataData$ = this.ApprovedDataSubject.asObservable();
//     updateProjectData(approved: ApprovedTeam) {
//     this.ApprovedDataSubject.next(approved);
//   }
//   constructor() { }
// }

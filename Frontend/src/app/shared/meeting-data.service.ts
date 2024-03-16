import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meeting } from '../models/Meeting';
@Injectable({
  providedIn: 'root'
})
export class MeetingDataService {
  private MeetingDataSubject = new BehaviorSubject<Meeting | null>(null);
  MeetingDataData$ = this.MeetingDataSubject.asObservable();
    updateProjectData(momsMeeting: Meeting) {
    this.MeetingDataSubject.next(momsMeeting);
  }
  constructor() { }
}




// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { ResourceAllocation } from '../models/ResourceAllocation';
// @Injectable({
//   providedIn: 'root'
// })
// export class ResourceDataService {
//   private ResourceDataSubject = new BehaviorSubject<ResourceAllocation | null>(null);
//   ResourceDataData$ = this.ResourceDataSubject.asObservable();
//     updateProjectData(resource: ResourceAllocation) {
//     this.ResourceDataSubject.next(resource);
//   }
//   constructor() { }
// }


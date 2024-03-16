import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Feedback } from '../models/Feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
    private FeedbackDataSubject = new BehaviorSubject<Feedback | null>(null);
  FeedbackDataData$ = this.FeedbackDataSubject.asObservable();
    updateProjectData(clientFeedback: Feedback) {
    this.FeedbackDataSubject.next(clientFeedback);
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


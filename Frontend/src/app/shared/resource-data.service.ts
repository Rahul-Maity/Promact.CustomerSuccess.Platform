import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResourceAllocation } from '../models/ResourceAllocation';
@Injectable({
  providedIn: 'root'
})
export class ResourceDataService {
  private ResourceDataSubject = new BehaviorSubject<ResourceAllocation | null>(null);
  ResourceDataData$ = this.ResourceDataSubject.asObservable();
    updateResourceData(resource: ResourceAllocation) {
    this.ResourceDataSubject.next(resource);
  }
  constructor() { }
}










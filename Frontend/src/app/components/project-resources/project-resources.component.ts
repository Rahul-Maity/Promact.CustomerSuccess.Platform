import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceAllocationService } from '../../shared/resource-allocation.service';
import { ResourceAllocation } from '../../models/ResourceAllocation';

@Component({
  selector: 'app-project-resources',
  templateUrl: './project-resources.component.html',
  styleUrl: './project-resources.component.css'
})
export class ProjectResourcesComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private resourceAllocationService: ResourceAllocationService) { }

  resourceAllocationForm !: FormGroup;
  ngOnInit(): void {
    this.resourceAllocationForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      allocationPercentage: [0, Validators.required],
      start: [new Date(), Validators.required],
      end: [new Date(), Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.resourceAllocationForm.valid) {
      // const resourceAllocationData = this.resourceAllocationForm.value;
      const resourceAllocationData: ResourceAllocation = {
        projectId: this.resourceAllocationForm.value.projectId,
        allocationPercentage: this.resourceAllocationForm.value.allocationPercentage,
        start: this.resourceAllocationForm.value.start,
        end: this.resourceAllocationForm.value.end,
        role: this.resourceAllocationForm.value.role,
      }
      this.resourceAllocationService.createResourceAllocation(resourceAllocationData).subscribe(
        (response) => {
          console.log('Resource allocation created successfully:', response);
          // Handle success
          this.resourceAllocationForm.reset();
        },
        (error) => {
          console.error('Error creating resource allocation:', error);
          // Handle error
        }
      );
    } else {
      console.log('Form invalid');
    }
  }
}

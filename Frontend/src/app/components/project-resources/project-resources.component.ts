import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceAllocationService } from '../../shared/resource-allocation.service';
import { ResourceAllocation } from '../../models/ResourceAllocation';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';

@Component({
  selector: 'app-project-resources',
  templateUrl: './project-resources.component.html',
  styleUrl: './project-resources.component.css'
})
export class ProjectResourcesComponent implements OnInit{

  @Input() projectId!: string; 
  stakeHolders: Stakeholder[] = [];
  constructor(private formBuilder: FormBuilder, private resourceAllocationService: ResourceAllocationService,private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }

  resourceAllocationForm !: FormGroup;
  ngOnInit(): void {
    this.resourceAllocationForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
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
          // this.resourceAllocationForm.reset();
          // this.resourceAllocationForm.patchValue({ projectId: this.projectId }); 




          this.toast.success({ detail: "Resource data created", summary: 'Refresh to see the changes', duration: 3000 });
   


          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, resourceAllocationData).subscribe(
                () => {
                  console.log('email sent successfully');
                  
          this.toast.success({ detail: "Success",summary:'Email sent to all stakeholders',duration: 3000 });
                  this.resourceAllocationForm.reset();
                  this.resourceAllocationForm.patchValue({ projectId: this.projectId });

                },
                (error) => {
                  console.error('error sending emails', error);
                }
              );





            },
            (error) => {
              console.warn('error getting stakeholders:', error);
            }
          );



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






  sendEmail(stakeholders: Stakeholder[], resourceAllocationData:ResourceAllocation) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailResource', { stakeholders, resourceAllocationData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }


}

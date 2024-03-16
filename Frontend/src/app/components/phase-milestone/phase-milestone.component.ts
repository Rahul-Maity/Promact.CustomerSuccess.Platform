import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhaseMilestoneService } from '../../shared/phase-milestone.service';
import { PhaseMileStone } from '../../models/PhaseMilestone';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-phase-milestone',
  templateUrl: './phase-milestone.component.html',
  styleUrl: './phase-milestone.component.css'
})
export class PhaseMilestoneComponent implements OnInit{
  @Input() projectId!: string;
  phaseMileStoneForm!: FormGroup;
  stakeHolders: Stakeholder[] = [];

  foods: Food[] = [
    {value: 'NotStarted', viewValue: 'NotStarted'},
    { value: 'InProgress', viewValue: 'InProgress' },
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'OnHold', viewValue: 'OnHold'},
    {value: 'Cancelled', viewValue: 'Cancelled'},
  
  ];

  constructor(private formBuilder: FormBuilder, private phaseMileStoneService: PhaseMilestoneService,private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }

  ngOnInit(): void {
    this.phaseMileStoneForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      status: ['', Validators.required],
      comments: ['', Validators.required],
      projectId: [this.projectId, Validators.required]
    });
  }




  onSubmit(): void {
    if (this.phaseMileStoneForm.valid) {
      const phaseMileStoneData: PhaseMileStone = {
        title: this.phaseMileStoneForm.value.title,
        description: this.phaseMileStoneForm.value.description,
        startDate: this.phaseMileStoneForm.value.startDate,
        endDate: this.phaseMileStoneForm.value.endDate,
        status: this.phaseMileStoneForm.value.status,
        comments: this.phaseMileStoneForm.value.comments,
        projectId: this.phaseMileStoneForm.value.projectId
      };

      this.phaseMileStoneService.createPhaseMileStone(phaseMileStoneData).subscribe(
        (response) => {
          console.log('Phase milestone created successfully:', response);
          // Reset the form after successful submission






          this.toast.success({ detail: "Phase Milestone created", summary: 'Refresh to see the changes', duration: 3000 });



          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, phaseMileStoneData).subscribe(
                () => {
                  this.phaseMileStoneForm.reset();
                  this.phaseMileStoneForm.patchValue({ projectId: this.projectId }); 
                  console.log('email sent successfully');
                  
          this.toast.success({ detail: "Success",summary:'Email sent to all stakeholders',duration: 3000 });
                

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
          console.error('Error creating phase milestone:', error);
          // Handle error
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }



  sendEmail(stakeholders: Stakeholder[], phaseMileStoneData:PhaseMileStone) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailPhaseMileStone', { stakeholders, phaseMileStoneData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }



}

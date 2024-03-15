import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhaseMilestoneService } from '../../shared/phase-milestone.service';
import { PhaseMileStone } from '../../models/PhaseMilestone';

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

  foods: Food[] = [
    {value: 'NotStarted', viewValue: 'NotStarted'},
    { value: 'InProgress', viewValue: 'InProgress' },
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'OnHold', viewValue: 'OnHold'},
    {value: 'Cancelled', viewValue: 'Cancelled'},
  
  ];

  constructor(private formBuilder: FormBuilder, private phaseMileStoneService: PhaseMilestoneService) { }

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
          this.phaseMileStoneForm.reset();
          this.phaseMileStoneForm.patchValue({ projectId: this.projectId }); 
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
}

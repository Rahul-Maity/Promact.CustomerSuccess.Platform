import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SprintService } from '../../shared/sprint.service';
import { Sprint } from '../../models/Sprint';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent implements OnInit {
  @Input() projectId!: string;
  sprintForm!: FormGroup;
  foods: Food[] = [
    {value: 'InProgress', viewValue: 'InProgress'},
    { value: 'Completed', viewValue: 'Completed' },
    {value: 'Delayed', viewValue: 'Delayed'},
    {value: 'OnTrack', viewValue: 'OnTrack'},
    {value: 'SignOffPending', viewValue: 'SignOffPending'},
  
  ];

  constructor(private formBuilder: FormBuilder, private sprintService: SprintService) { }
  ngOnInit(): void {
    this.sprintForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      sprintNumber: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      status: ['', Validators.required],
      comments: ['']
    });
  }

  onSubmit(): void {

    if (this.sprintForm.valid) {
      const sprintData: Sprint = {
        projectId: this.sprintForm.value.projectId,
        sprintNumber: this.sprintForm.value.sprintNumber,
        startDate: this.sprintForm.value.startDate,
        endDate: this.sprintForm.value.endDate,
        status: this.sprintForm.value.status,
        comments: this.sprintForm.value.comments
      };

      this.sprintService.createSprint(sprintData).subscribe(
        (response) => {
          console.log('Sprint created successfully:', response);
         
          this.sprintForm.reset();
          this.sprintForm.patchValue({ projectId: this.projectId });
        },
        (error) => {
          console.error('Error creating sprint:', error);
         
        }
      );
    } else {
      
    }


  }

}

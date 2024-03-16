import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectDescriptionService } from '../../shared/project-description.service';
import { ProjectDescription } from '../../models/ProjectDescription';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css'
})
export class ProjectDescriptionComponent implements OnInit {
  foods: Food[] = [
    {value: 'Backend', viewValue: 'Backend'},
    { value: 'Frontend', viewValue: 'Frontend' },
    {value: 'Mobile', viewValue: 'Mobile'},
    {value: 'Database', viewValue: 'Database'},
    {value: 'Infrastructure', viewValue: 'Infrastructure'}
  
  
  ];
  @Input() projectId!: string;
  projectDescriptionForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private projectDescriptionService: ProjectDescriptionService) { }
  ngOnInit(): void {
    this.projectDescriptionForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      description: ['', Validators.required],
      techStack: ['', Validators.required],
      detailedTimeline: ['', Validators.required]
    });
  
  }

  onSubmit(): void {
    if (this.projectDescriptionForm.valid) {
      const projectDescriptionData: ProjectDescription = {
        projectId: this.projectDescriptionForm.value.projectId,
        description: this.projectDescriptionForm.value.description,
        techStack: this.projectDescriptionForm.value.techStack,
        detailedTimeline: this.projectDescriptionForm.value.detailedTimeline
      };

      this.projectDescriptionService.createProjectDescription(projectDescriptionData).subscribe(
        (response) => {
          console.log('Project Description created successfully:', response);
          this.projectDescriptionForm.reset();
          this.projectDescriptionForm.patchValue({ projectId: this.projectId });
        },
        (error) => {
          console.error('Error creating project description:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

}

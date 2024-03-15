import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectUpdateService } from '../../shared/project-update.service';
@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrl: './project-update.component.css'
})
export class ProjectUpdateComponent implements OnInit{
  @Input() projectId!: string ;
  updateForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private projectUpdateService: ProjectUpdateService) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      date: ['', Validators.required],
      generalUpdates: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.updateForm.valid) {
      const projectUpdateData = {
        projectId: this.updateForm.value.projectId,
        date: this.updateForm.value.date,
        generalUpdates: this.updateForm.value.generalUpdates
      };

      this.projectUpdateService.createProjectUpdate(projectUpdateData).subscribe(
        (response) => {
          console.log('Project update created successfully:', response);

          this.updateForm.reset();
          this.updateForm.patchValue({ projectId: this.projectId }); 
        },
        (error) => {
          console.error('Error creating project update:', error);
        }
      );
    } else {
      console.log('Form invalid');
    }
  }
}

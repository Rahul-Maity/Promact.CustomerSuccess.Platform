import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectUpdateService } from '../../shared/project-update.service';
@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrl: './project-update.component.css'
})
export class ProjectUpdateComponent implements OnInit{

  updateForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private projectUpdateService: ProjectUpdateService) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      projectId: ['', Validators.required],
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

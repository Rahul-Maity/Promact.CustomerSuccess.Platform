
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProjectService } from '../../shared/project.service';
import { Project } from '../../models/project';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrl: './dialog-body.component.css'
})
export class DialogBodyComponent implements OnInit{
  firstFormGroup !: FormGroup;
  @Output() projectCreated: EventEmitter<Project> = new EventEmitter<Project>();
  constructor(private _formBuilder: FormBuilder, private projectService: ProjectService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      projectName: ['', Validators.required],
      projectDetails: ['', Validators.required]
    });
  }
 
  onClick() {
    if (this.firstFormGroup.valid) {
      const projectData: Project = {
        name: this.firstFormGroup.value.projectName,
        description: this.firstFormGroup.value.projectDetails
      };

      this.projectService.createProject(projectData).subscribe(
        (response:Project) => {

          console.log('Project created successfully:', response);
 
          this.projectCreated.emit(response);
         
        },
        (error) => {
          console.error('Error creating project:', error);
        }
      );
    } else {
      console.log('form invalid');
    }
    }
  

 

  foods: Food[] = [
    {value: 'dipa', viewValue: 'Dipa Majumdar'},
  
  ];

}

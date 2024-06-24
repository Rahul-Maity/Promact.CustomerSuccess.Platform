
import { Component, OnInit, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProjectService } from '../../shared/project.service';
import { Project } from '../../models/project';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrl: './dialog-body.component.css'
})
export class DialogBodyComponent implements OnInit {
  editMode: boolean = false;
  project: Project | undefined;
  firstFormGroup !: FormGroup;
  @Output() projectCreated: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() projectUpdated: EventEmitter<Project> = new EventEmitter<Project>();
  constructor(private _formBuilder: FormBuilder, private projectService: ProjectService, public dialogRef: MatDialogRef<DialogBodyComponent>, private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.project) {
      this.project = data.project;
      this.editMode = true;
    }
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      projectName: [this.project ? this.project.name : '', Validators.required],
      projectDetails: [this.project ? this.project.description : '', Validators.required]
    });
  }

  onClick() {
    if (this.firstFormGroup.valid) {
      const projectData: Project = {
        id: this.project ? this.project.id : null,

        name: this.firstFormGroup.value.projectName,
        description: this.firstFormGroup.value.projectDetails
      };

      if (this.editMode) {
        this.projectService.updateProject(this.project?.id, projectData).subscribe(
          (res: Project) => {
            console.log('project updated successfully', res);
            this.projectUpdated.emit(res);
            this.dialogRef.close(res);
          },
          (err) => {
            console.error('error updating project', err);
          }
        )
      }
      else {
        this.projectService.createProject(projectData).subscribe(
          (response: Project) => {

            console.log('Project created successfully:', response);

            this.projectCreated.emit(response);

          },
          (error) => {
            console.error('Error creating project:', error);
          }
        );
      }


    } else {
      console.log('form invalid');
    }
  }




  foods: Food[] = [
    { value: 'dipa', viewValue: 'Dipa Majumdar' },

  ];

}

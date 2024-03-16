import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectUpdateService } from '../../shared/project-update.service';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { ProjectUpdate } from '../../models/ProjectUpdate';
import { tap } from 'rxjs';
@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrl: './project-update.component.css'
})
export class ProjectUpdateComponent implements OnInit{
  @Input() projectId!: string ;
  updateForm !: FormGroup;
  stakeHolders: Stakeholder[] = [];
  constructor(private formBuilder: FormBuilder, private projectUpdateService: ProjectUpdateService,private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }

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



          this.toast.success({ detail: "Project Update created", summary: 'Refresh to see the changes', duration: 3000 });



          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, projectUpdateData).subscribe(
                () => {
                  this.updateForm.reset();
                  this.updateForm.patchValue({ projectId: this.projectId });
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
          console.error('Error creating project update:', error);
        }
      );
    } else {
      console.log('Form invalid');
    }
  }






  sendEmail(stakeholders: Stakeholder[], projectUpdateData:ProjectUpdate) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailProjectUpdate', { stakeholders, projectUpdateData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }
}

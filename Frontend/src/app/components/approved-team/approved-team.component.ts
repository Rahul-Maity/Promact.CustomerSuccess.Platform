import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprovedTeamService } from '../../shared/approved-team.service';
import { ApprovedTeam } from '../../models/approvedTeam';
import { NgToastService } from 'ng-angular-popup';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
@Component({
  selector: 'app-approved-team',
  templateUrl: './approved-team.component.html',
  styleUrl: './approved-team.component.css'
})
export class ApprovedTeamComponent implements OnInit {
  @Input() projectId!: string;
  approvedForm !: FormGroup;
  stakeHolders: Stakeholder[] = [];

  constructor(private formBuilder: FormBuilder, private approvedTeamService: ApprovedTeamService, private toast: NgToastService, private stakeholderService: StakeholderService, private http: HttpClient) { }

  ngOnInit(): void {
    this.approvedForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      phase: ['', Validators.required],
      numberOfResources: ['', Validators.required],
      role: ['', Validators.required],
      availabilityPercentage: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.approvedForm.valid) {
      const approvedTeamData: ApprovedTeam = {
        projectId: this.approvedForm.value.projectId,
        phase: this.approvedForm.value.phase,
        numberOfResources: this.approvedForm.value.numberOfResources,
        role: this.approvedForm.value.role,
        availabilityPercentage: this.approvedForm.value.availabilityPercentage,
        duration: this.approvedForm.value.duration
      }
      this.approvedTeamService.createApprovedTeam(approvedTeamData).subscribe(
        (response) => {
          console.log('Approved created successfully:', response);



          this.toast.success({ detail: "Approved Team created", summary: 'Refresh to see the changes', duration: 5000 });

          // this.approvedForm.reset();
          // this.approvedForm.patchValue({ projectId: this.projectId }); 













          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, approvedTeamData).subscribe(
                () => {
                  console.log('email sent successfully');
                  this.approvedForm.reset();
                  this.approvedForm.patchValue({ projectId: this.projectId });

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
          console.error('Error creating approved team:', error);
          this.toast.error({ detail: "ERROR", summary: 'Error creating approved team', sticky: true });
        }
      );
    } else {
      this.toast.error({ detail: "ERROR", summary: 'invalid form', duration: 5000 });
      console.log('Form invalid');
    }
  }







  sendEmail(stakeholders: Stakeholder[], ApprovedData: ApprovedTeam) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailApprovedTeam', { stakeholders, ApprovedData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }
  



}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprovedTeamService } from '../../shared/approved-team.service';
import { ApprovedTeam } from '../../models/approvedTeam';
@Component({
  selector: 'app-approved-team',
  templateUrl: './approved-team.component.html',
  styleUrl: './approved-team.component.css'
})
export class ApprovedTeamComponent implements OnInit {

  approvedForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,private approvedTeamService:ApprovedTeamService) { }

  ngOnInit(): void {
    this.approvedForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      phase: [0, Validators.required],
      numberOfResources: [0, Validators.required],
      role: ['', Validators.required],
      availabilityPercentage: [0, Validators.required],
      duration: [0, Validators.required]
    });
  }


  onSubmit() : void {
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
          console.log('Resource created successfully:', response);
          
          this.approvedForm.reset();
        },
        (error) => {
          console.error('Error creating resource:', error);
        }
      );
    } else {
   
      console.log('Form invalid');
    }
  }


}

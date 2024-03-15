import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../../shared/meeting.service';
import { Meeting } from '../../models/Meeting';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';
@Component({
  selector: 'app-moms-meeting',
  templateUrl: './moms-meeting.component.html',
  styleUrl: './moms-meeting.component.css'
})
export class MomsMeetingComponent implements OnInit {
  @Input() projectId!: string;

  meetingForm !: FormGroup;
  stakeHolders: Stakeholder[] = [];
  constructor(private formBuilder: FormBuilder, private meetingService: MeetingService,private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }

  ngOnInit(): void {
    this.meetingForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      meetingDate: ['', Validators.required],
      moMLink: ['', Validators.required],
      comments: [''] 
    });
  }

  onSubmit(): void {
    if (this.meetingForm.valid) {
      const meetingData: Meeting = {
        projectId: this.meetingForm.value.projectId,
        meetingDate: this.meetingForm.value.meetingDate,
        moMLink: this.meetingForm.value.moMLink,
        comments: this.meetingForm.value.comments
      };
      this.meetingService.createMeeting(meetingData).subscribe(
        (response) => {
          console.log('Meeting created successfully:', response);

          // this.meetingForm.reset();
          // this.meetingForm.patchValue({ projectId: this.projectId }); 
          this.toast.success({ detail: "Meeting data created", summary: 'Refresh to see the changes', duration: 3000 });
   


          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, meetingData).subscribe(
                () => {
                  console.log('email sent successfully');
                  
          this.toast.success({ detail: "Success",summary:'Email sent to all stakeholders',duration: 3000 });
                  this.meetingForm.reset();
                  this.meetingForm.patchValue({ projectId: this.projectId });

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
          console.error('Error creating meeting:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }




  sendEmail(stakeholders: Stakeholder[], meetingData:Meeting) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailMeeting', { stakeholders, meetingData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }




}

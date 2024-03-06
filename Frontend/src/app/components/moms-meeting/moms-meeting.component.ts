import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../../shared/meeting.service';
import { Meeting } from '../../models/Meeting';
@Component({
  selector: 'app-moms-meeting',
  templateUrl: './moms-meeting.component.html',
  styleUrl: './moms-meeting.component.css'
})
export class MomsMeetingComponent implements OnInit {


  meetingForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.meetingForm = this.formBuilder.group({
      projectId: ['', Validators.required],
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
        },
        (error) => {
          console.error('Error creating meeting:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

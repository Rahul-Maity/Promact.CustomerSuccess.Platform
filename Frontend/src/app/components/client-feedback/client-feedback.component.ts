import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../shared/feedback.service';
import { Feedback } from '../../models/Feedback';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.css'
})
export class ClientFeedbackComponent implements OnInit {

  @Input() projectId!: string;
  feedbackForm !: FormGroup;
  stakeHolders: Stakeholder[] = [];
  constructor(private formBuilder: FormBuilder, private feedbackService: FeedbackService,private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      feedbackType: ['', Validators.required],
      dateReceived: ['', Validators.required],
      detailedFeedback: ['', Validators.required],
      actionTaken: ['', Validators.required],
      closureDate: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.feedbackForm.valid) {
      const feedbackData:Feedback = {
        projectId: this.feedbackForm.value.projectId,
        feedbackType: this.feedbackForm.value.feedbackType,
        dateReceived: this.feedbackForm.value.dateReceived,
        detailedFeedback: this.feedbackForm.value.detailedFeedback,
        actionTaken: this.feedbackForm.value.actionTaken,
        closureDate: this.feedbackForm.value.closureDate
      };

      this.feedbackService.createFeedback(feedbackData).subscribe(
        (response) => {
          console.log('Feedback created successfully:', response);
          // this.feedbackForm.reset();
          // this.feedbackForm.patchValue({ projectId: this.projectId }); 

          
          this.toast.success({ detail: "Client Feedback created", summary: 'Refresh to see the changes', duration: 3000 });
   


          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, feedbackData).subscribe(
                () => {
                  console.log('email sent successfully');
                  
          this.toast.success({ detail: "Success",summary:'Email sent to all stakeholders',duration: 3000 });
                  this.feedbackForm.reset();
                  this.feedbackForm.patchValue({ projectId: this.projectId });

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
          console.error('Error creating feedback:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }




  sendEmail(stakeholders: Stakeholder[], feedbackData:Feedback) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailClientFeedback', { stakeholders, feedbackData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }


  foods: Food[] = [
    {value: 'Complaint', viewValue: 'Complaint'},
    { value: 'Appreciation', viewValue: 'Appreciation' }
  
  ];

}

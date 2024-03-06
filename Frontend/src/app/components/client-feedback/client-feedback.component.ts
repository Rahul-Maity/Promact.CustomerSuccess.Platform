import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../shared/feedback.service';
import { Feedback } from '../../models/Feedback';
@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.css'
})
export class ClientFeedbackComponent implements OnInit {


  feedbackForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      projectId: ['', Validators.required],
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
          this.feedbackForm.reset();
        },
        (error) => {
          console.error('Error creating feedback:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }


}

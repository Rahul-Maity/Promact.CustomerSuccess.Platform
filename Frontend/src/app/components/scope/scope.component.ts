import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScopeService } from '../../shared/scope.service';
import { Scope } from '../../models/Scope';
import { Stakeholder } from '../../models/Stakeholder';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { StakeholderService } from '../../shared/stakeholder.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrl: './scope.component.css'
})
export class ScopeComponent implements OnInit {

  @Input() projectId!: string;
  stakeHolders: Stakeholder[] = [];
  scopeForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private scopeService: ScopeService, private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }

  ngOnInit(): void {
    this.scopeForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      includedItems: ['', Validators.required],
      excludedItems: ['', Validators.required],
      additionalNotes: ['']
    });
  }

  onSubmit(): void {
    if (this.scopeForm.valid) {
      const scopeData: Scope = {
        projectId: this.scopeForm.value.projectId,
        includedItems: this.scopeForm.value.includedItems,
        excludedItems: this.scopeForm.value.excludedItems,
        additionalNotes: this.scopeForm.value.additionalNotes
      };
      this.scopeService.createScope(scopeData).subscribe(
        (response) => {
          console.log('Scope created successfully:', response);




          this.toast.success({ detail: "Project scope created", summary: 'Refresh to see the changes', duration: 3000 });



          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders', this.stakeHolders);
              this.sendEmail(this.stakeHolders, scopeData).subscribe(
                () => {
                  this.scopeForm.reset();
                  this.scopeForm.patchValue({ projectId: this.projectId });


                  console.log('email sent successfully');

                  this.toast.success({ detail: "Success", summary: 'Email sent to all stakeholders', duration: 3000 });


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
          console.error('Error creating scope:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }



  sendEmail(stakeholders: Stakeholder[], scopeData:Scope) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailProjectScope', { stakeholders, scopeData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }

}

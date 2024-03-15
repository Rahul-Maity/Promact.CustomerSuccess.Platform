import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../../shared/budget.service';
import { Budget } from '../../models/Budget';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';


interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
  
  
  


export class BudgetComponent implements OnInit {
  @Input() projectId!: string;
  budgetForm!: FormGroup;

  stakeHolders: Stakeholder[] = [];

  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService,private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }
  ngOnInit(): void {
    this.budgetForm = this.formBuilder.group({
      type: ['', Validators.required],
      durationInMonths: ['', Validators.required],
      contractDuration: ['', Validators.required],
      budgetedHours: ['', Validators.required],
      budgetedCost: ['', Validators.required],
      currency: ['', Validators.required],
      projectId: [this.projectId, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.budgetForm.valid) {
      const budgetData: Budget = {
        type: this.budgetForm.value.type,
        durationInMonths: this.budgetForm.value.durationInMonths,
        contractDuration: this.budgetForm.value.contractDuration,
        budgetedHours: this.budgetForm.value.budgetedHours,
        budgetedCost: this.budgetForm.value.budgetedCost,
        currency: this.budgetForm.value.currency,
        projectId: this.budgetForm.value.projectId
      };

      this.budgetService.createBudget(budgetData).subscribe(
        (response) => {
          console.log('Budget created successfully:', response);
          
          this.toast.success({ detail: "project budget created", summary: 'Refresh to see the changes', duration: 3000 });
   


          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, budgetData).subscribe(
                () => {
                  console.log('email sent successfully');
                  
          this.toast.success({ detail: "Success",summary:'Email sent to all stakeholders',duration: 3000 });
                  this.budgetForm.reset();
                  this.budgetForm.patchValue({ projectId: this.projectId });

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
          
          this.toast.error({ detail: "Error", summary: 'Error creating budget', duration: 5000 });
          console.error('Error creating budget:', error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.toast.error({ detail: "Error", summary: 'Invalid form details', duration: 5000 });
    }
  }

  foods: Food[] = [
    {value: 'FixedBudget', viewValue: 'FixedBudget'},
    {value: 'ManMonth', viewValue: 'ManMonth'},
  
  ];















  sendEmail(stakeholders: Stakeholder[], budgetData: Budget) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailBudget', { stakeholders, budgetData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }

}

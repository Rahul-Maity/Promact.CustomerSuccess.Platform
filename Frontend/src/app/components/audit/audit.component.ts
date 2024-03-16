import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditService } from '../../shared/audit.service';
import { Audit } from '../../models/Audit';
import { HttpClient } from '@angular/common/http';
import { StakeholderService } from '../../shared/stakeholder.service';
import { Stakeholder } from '../../models/Stakeholder';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.css'
})
export class AuditComponent implements OnInit {
  @Input() projectId!: string;
  stakeHolders: Stakeholder[]= [];

  auditForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private auditService: AuditService,private http:HttpClient,private stakeholderService:StakeholderService,private toast: NgToastService) { }

  ngOnInit(): void {
    this.auditForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      dateOfAudit: ['', Validators.required],
      reviewedBy: ['', Validators.required],
      status: ['', Validators.required],
      reviewedSection: ['', Validators.required],
      commentQueries: ['', Validators.required],
      actionItem: ['', Validators.required]
    });
  }




  onSubmit(): void {
    if (this.auditForm.valid) {
      const auditData: Audit = {
        projectId: this.auditForm.value.projectId,
        dateOfAudit: this.auditForm.value.dateOfAudit,
        reviewedBy: this.auditForm.value.reviewedBy,
        status: this.auditForm.value.status,
        reviewedSection: this.auditForm.value.reviewedSection,
        commentQueries: this.auditForm.value.commentQueries,
        actionItem: this.auditForm.value.actionItem
      };
      console.log('Audit Data : ', auditData);
      this.auditService.createAudit(auditData).subscribe(
        (response) => {
          console.log('Audit created successfully:', response);
          this.toast.success({ detail: "Audit Created", summary: 'Refresh to see the changes', duration: 3000 });


          this.stakeholderService.getAllStakeholders().subscribe(
            (response:any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);
        
              
          this.sendEmail(this.stakeHolders,auditData).subscribe(
            () => {
              this.toast.success({ detail: "Success", summary: 'Email sent to all stakeholders', duration: 3000 });
              console.log('email sent successfully');
              this.auditForm.reset();
              this.auditForm.patchValue({ projectId: this.projectId });

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
          console.error('Error creating audit:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }





  sendEmail(stakeholders: Stakeholder[],auditData: Audit) {
    return this.http.post('https://localhost:44347/api/Email/sendEmail', {stakeholders,auditData});
  }





}

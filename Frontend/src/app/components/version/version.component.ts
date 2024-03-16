import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VersionService } from '../../shared/version.service';
import { Version } from '../../models/Version';
import { DocumentIdService } from '../../shared/document-id.service';
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
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.css'
})
export class VersionComponent implements OnInit{
  @Input() projectId!: string;
  foods: Food[] = [
    {value: 'TechStack', viewValue: 'TechStack'},
    { value: 'Domain', viewValue: 'Domain' },
    {value: 'Purpose', viewValue: 'Purpose'}

  
  ];
  versionForm!: FormGroup;
  createdDocumentId: string = '';
  stakeHolders: Stakeholder[] = [];

  constructor(private formBuilder: FormBuilder, private versionService: VersionService,private documentIdService:DocumentIdService,private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }

  ngOnInit(): void {

    this.documentIdService.createdDocumentId$.subscribe(id => {
      this.createdDocumentId = id !== undefined ? id : '';

      // console.log(this.createdDocumentId);
      this.initializeForm();
    })
   
  
  }
  initializeForm(): void {
    this.versionForm = this.formBuilder.group({
      changeType: ['', Validators.required],
      changes: ['', Validators.required],
      changeReason: ['', Validators.required],
      documentId: [this.createdDocumentId, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.versionForm.valid) {
      const versionData: Version = {
        changeType: this.versionForm.value.changeType,
        changes: this.versionForm.value.changes,
        changeReason: this.versionForm.value.changeReason,
        documentId: this.versionForm.value.documentId
      };
      this.versionService.createVersion(versionData).subscribe(
        (response) => {
          console.log('Version created successfully:', response);


          this.toast.success({ detail: "Version document created", summary: 'Refresh to see the changes', duration: 3000 });



          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, versionData).subscribe(
                () => {
                  // this.documentForm.reset();
                  // this.documentForm.patchValue({ projectId: this.projectId }); 
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
          console.error('Error creating version:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }




  sendEmail(stakeholders: Stakeholder[], versionData:Version) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailDocumentVersion', { stakeholders, versionData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }
}

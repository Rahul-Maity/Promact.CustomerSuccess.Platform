import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../../shared/document.service';
import { Document } from '../../models/Document';
import { DocumentIdService } from '../../shared/document-id.service';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {
  @Input() projectId!: string;
  createdDocumentId: string | undefined;
  documentForm!: FormGroup;
  stakeHolders: Stakeholder[] = [];
  constructor(private formBuilder: FormBuilder, private documentService: DocumentService,private documentIdService:DocumentIdService,private stakeholderService: StakeholderService, private http: HttpClient, private toast: NgToastService) { }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      projectId: [this.projectId, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      const documentData: Document = {
        name: this.documentForm.value.name,
        description: this.documentForm.value.description,
        url: this.documentForm.value.url,
        projectId: this.documentForm.value.projectId
      };
      this.documentService.createDocument(documentData).subscribe(
        (response) => {
          console.log('Document created successfully:', response);
          // Reset the form after successful submission
          this.createdDocumentId = response.id;
          this.documentIdService.setCreatedDocumentId(this.createdDocumentId);





          this.toast.success({ detail: "Document created", summary: 'Refresh to see the changes', duration: 3000 });



          this.stakeholderService.getAllStakeholders().subscribe(
            (response: any) => {
              console.log('Getting Stakeholders', response.items);
              this.stakeHolders = response.items;
              this.stakeHolders = this.stakeHolders.filter(stakeholder => stakeholder.projectId === this.projectId);

              console.log('filtered stakeholders',this.stakeHolders);
              this.sendEmail(this.stakeHolders, documentData).subscribe(
                () => {
                  this.documentForm.reset();
                  this.documentForm.patchValue({ projectId: this.projectId }); 
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
          console.error('Error creating document:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }






  sendEmail(stakeholders: Stakeholder[], documentData:Document) {
    return this.http.post('https://localhost:44347/api/Email/sendEmailProjectDocument', { stakeholders, documentData }).pipe(
      tap(
        () => console.log('Email sent successfully'),
        (error) => console.error('Error sending emails:', error)
      )
    );
  }
}

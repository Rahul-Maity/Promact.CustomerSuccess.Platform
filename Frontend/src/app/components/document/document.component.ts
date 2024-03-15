import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../../shared/document.service';
import { Document } from '../../models/Document';
import { DocumentIdService } from '../../shared/document-id.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {
  @Input() projectId!: string;
  createdDocumentId: string | undefined;
  documentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private documentService: DocumentService,private documentIdService:DocumentIdService) { }

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
          this.documentForm.reset();
          this.documentForm.patchValue({ projectId: this.projectId }); 
        },
        (error) => {
          console.error('Error creating document:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

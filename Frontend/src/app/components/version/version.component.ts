import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VersionService } from '../../shared/version.service';
import { Version } from '../../models/Version';
import { DocumentIdService } from '../../shared/document-id.service';
@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.css'
})
export class VersionComponent implements OnInit{
  versionForm!: FormGroup;
  createdDocumentId: string ='';

  constructor(private formBuilder: FormBuilder, private versionService: VersionService,private documentIdService:DocumentIdService) { }

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
        },
        (error) => {
          console.error('Error creating version:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

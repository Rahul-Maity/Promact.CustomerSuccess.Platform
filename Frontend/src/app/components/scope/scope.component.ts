import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScopeService } from '../../shared/scope.service';
import { Scope } from '../../models/Scope';
@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrl: './scope.component.css'
})
export class ScopeComponent implements OnInit{

  @Input() projectId!: string;

  scopeForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private scopeService: ScopeService) { }

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

          this.scopeForm.reset();
          this.scopeForm.patchValue({ projectId: this.projectId });
          
        },
        (error) => {
          console.error('Error creating scope:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
}

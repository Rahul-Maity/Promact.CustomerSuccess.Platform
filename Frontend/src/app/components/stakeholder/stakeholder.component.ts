import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StakeholderService } from '../../shared/stakeholder.service';
import { Stakeholder } from '../../models/Stakeholder';
import { NgToastService } from 'ng-angular-popup';
import { StakeholderDataService } from '../../shared/stakeholder-data.service';
interface Food {
  value: string;
  viewValue: string;
}




  
@Component({
  selector: 'app-stakeholder',
  templateUrl: './stakeholder.component.html',
  styleUrl: './stakeholder.component.css'
})
export class StakeholderComponent implements OnInit{
  @Output() stakeholderCreated: EventEmitter<void> = new EventEmitter<void>();
  // @Output() stakeholderCreated: EventEmitter<Stakeholder> = new EventEmitter<Stakeholder>();
  displayedColumns: string[] = ['title', 'name', 'contact'];
  @Input() projectId!: string;
  stakeholders: Stakeholder[] = [];
  stakeholderForm!: FormGroup;

 
  constructor(private formBuilder: FormBuilder, private stakeholderService: StakeholderService,private toast:NgToastService,private changeDetectorRef:ChangeDetectorRef,private stakeDataService:StakeholderDataService) { }
  ngOnInit(): void {
    this.stakeholderForm = this.formBuilder.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      projectId: [this.projectId, Validators.required]
    });












    








  }


  


  onSubmit(): void {
    if (this.stakeholderForm.valid) {
      const stakeholderData: Stakeholder = {
        title: this.stakeholderForm.value.title,
        name: this.stakeholderForm.value.name,
        contact: this.stakeholderForm.value.contact,
        projectId: this.stakeholderForm.value.projectId
      };

      this.stakeholderService.createStakeholder(stakeholderData).subscribe(
        (response) => {
          console.log('Stakeholder created successfully:', response);
           this.stakeholderCreated.emit();
          this.toast.success({ detail: "SUCCESS", summary: 'Approved Team created', duration: 5000 });
          // Reset the form after successful submission
          this.stakeholderForm.reset();
          this.stakeholderForm.patchValue({ projectId: this.projectId }); 
          // this.stakeholderCreated.emit(response);
        },
        (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Error creating approved team', sticky: true });
          console.error('Error creating stakeholder:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  foods: Food[] = [
    {value: 'ProjectManager', viewValue: 'ProjectManager'},
    { value: 'Client', viewValue: 'Client' },
    {value: 'AccountManager', viewValue: 'AccountManager'}
  
  ];

}

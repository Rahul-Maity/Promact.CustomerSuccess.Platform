import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RiskProfileService } from '../../shared/risk-profile.service';
import { RiskProfile } from '../../models/RiskProfile';
interface Food {
  value: string;
  viewValue: string;
}
interface Severity{
  value: string;
  viewValue: string;
}
interface Impact{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-risk-profile',
  templateUrl: './risk-profile.component.html',
  styleUrl: './risk-profile.component.css'
})
export class RiskProfileComponent implements OnInit{
  @Input() projectId!: string;

  foods: Food[] = [
    {value: 'Financial', viewValue: 'Financial'},
    { value: 'Operational', viewValue: 'Operational' },
    {value: 'Technical', viewValue: 'Technical'},
    {value: 'HumanResource', viewValue: 'HumanResource'},
    {value: 'External', viewValue: 'External'},
    {value: 'Legal', viewValue: 'Legal'},
    {value: 'Reputational', viewValue: 'Reputational'},
    {value: 'Strategic', viewValue: 'Strategic'},
  
  ];
  severities: Severity[] = [
    {value: 'Low', viewValue: 'Low'},
    { value: 'Medium', viewValue: 'Medium' },
    {value: 'High', viewValue: 'High'}
 
  
  ];
  impacts: Impact[] = [
    {value: 'Low', viewValue: 'Low'},
    { value: 'Medium', viewValue: 'Medium' },
    {value: 'High', viewValue: 'High'}
 
  
  ];


  riskProfileForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private riskProfileService: RiskProfileService) { }
  ngOnInit(): void {
    this.riskProfileForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      riskType: ['', Validators.required],
      severity: ['', Validators.required],
      impact: ['', Validators.required],
      remedialSteps: ['', Validators.required],
      closureDate: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.riskProfileForm.valid) {
      const riskProfileData: RiskProfile = {
        projectId: this.riskProfileForm.value.projectId,
        riskType: this.riskProfileForm.value.riskType,
        severity: this.riskProfileForm.value.severity,
        impact: this.riskProfileForm.value.impact,
        remedialSteps: this.riskProfileForm.value.remedialSteps,
        closureDate: this.riskProfileForm.value.closureDate
      };

      this.riskProfileService.createRiskProfile(riskProfileData).subscribe(
        (response) => {
          console.log('Risk profile created successfully:', response);
          this.riskProfileForm.reset();
        },
        (error) => {
          console.error('Error creating risk profile:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

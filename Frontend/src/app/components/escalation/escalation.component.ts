import { Component, Input } from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import { Escalation } from '../../models/Escalation';
import { EscalationService } from '../../shared/escalation.service';

interface EscalationType {
  value: string;
  viewValue: string;
}
interface Name {
  value: string;
  viewValue: string;
}





@Component({
  selector: 'app-escalation',
  templateUrl: './escalation.component.html',
  styleUrl: './escalation.component.css'
})
export class EscalationComponent {
  @Input() projectId!: string; 

  selectedManagerName!: string;
  selectedCtoName!: string;
  selectedCeoName!: string;
  selectedType!: string;
  // projectId!: string;
  types: EscalationType[] = [
    { value: 'Operational', viewValue: 'Operational' },
    { value: 'Financial', viewValue: 'Financial' },
    { value: 'Technical', viewValue: 'Technical' }
    

  ];

  names: Name[] = [
    { value: 'dipa', viewValue: 'Dipa Majumdar' },
    { value: 'rushi', viewValue: 'Rushi Soni' },
    { value: 'chintan', viewValue: 'Chintan Shah' }
    

  ];
  escalationModelOne!: Escalation;
  escalationModelTwo!: Escalation;
  escalationModelThree!: Escalation;
  constructor(private escalationService:EscalationService) {

   
}

  OnSubmit() {
    this.escalationModelOne= {
      name: this.selectedManagerName,
      role: 'Project Manager',
      level: 1,
      escalationType: this.selectedType,
      projectId: this.projectId,
    };
    this.escalationModelTwo= {
      name: this.selectedCtoName,
      role: 'CTO',
      level: 2,
      escalationType: this.selectedType,
      projectId: this.projectId,
    };
    this.escalationModelThree= {
      name: this.selectedCeoName,
      role: 'CEO',
      level: 3,
      escalationType: this.selectedType,
      projectId: this.projectId,
    };
    this.escalationService.createEscalation(this.escalationModelOne).subscribe(
      (response) => {
        console.log('Escalation model one created successfully:', response);
      },
      (error) => {
        console.error('Error creating escalation model one:', error);
      }
    );

    this.escalationService.createEscalation(this.escalationModelTwo).subscribe(
      (response) => {
        console.log('Escalation model two created successfully:', response);
      },
      (error) => {
        console.error('Error creating escalation model two:', error);
      }
    );
    this.escalationService.createEscalation(this.escalationModelThree).subscribe(
      (response) => {
        console.log('Escalation model three created successfully:', response);
      },
      (error) => {
        console.error('Error creating escalation model three:', error);
      }
    );
  
  }


}

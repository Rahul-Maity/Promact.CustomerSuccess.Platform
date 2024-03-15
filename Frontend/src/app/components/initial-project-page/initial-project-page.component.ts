import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectDataService } from '../../shared/project-data.service';
import { ProjectService } from '../../shared/project.service';
import { Router } from '@angular/router';


export interface PeriodicElement {
  id: string;
  name: string;
  position: number;
  description: string;
  Manager: string;
}



@Component({
  selector: 'app-initial-project-page',
  templateUrl: './initial-project-page.component.html',
  styleUrl: './initial-project-page.component.css'
})
export class InitialProjectPageComponent implements OnInit {


 

  displayedColumns: string[] = ['position', 'name', 'description', 'Manager'];
  constructor(private projectDataService: ProjectDataService, private changeDetectorRef: ChangeDetectorRef,
  private projectService:ProjectService,private router:Router) { }
  dataSource: PeriodicElement[] = [];

  ngOnInit() {


  

    this.loadProjects();


    this.projectDataService.projectData$.subscribe((project: Project | null) => {
      if (project) {
        // console.log(project);
      
     
       
        const newData: PeriodicElement = {
          id:project.id||'',
          position: this.dataSource.length + 1,
          name: project.name,
          description: project.description,
          Manager: 'Dipa Majumdar' // You can set the manager name as needed
        };
        console.log(newData);
        this.dataSource = [...this.dataSource, newData];
        console.log(this.dataSource);
        this.changeDetectorRef.detectChanges();
      }
    });
    
  }


  loadProjects() {
    this.projectService.getAllProjects().subscribe(
      (response: any) => {
        const projects: Project[] = response.items;

        this.dataSource = projects.map((project, index) => ({
          id:project.id||'',
          position: index + 1,
          name: project.name,
          description: project.description,
          Manager: 'Dipa Majumdar' // You can set the manager name as needed
        }));
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

  selectProject(projectId: string) {
    this.router.navigate(['/project-details',projectId]);
  }



}

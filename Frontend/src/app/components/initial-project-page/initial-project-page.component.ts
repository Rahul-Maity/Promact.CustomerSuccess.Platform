import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectDataService } from '../../shared/project-data.service';
import { ProjectService } from '../../shared/project.service';
import { Router } from '@angular/router';
import { ProjectNameService } from '../../shared/project-name.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgToastService } from 'ng-angular-popup';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';


export interface PeriodicElement {
  id: any;
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



  constructor(private projectDataService: ProjectDataService, private changeDetectorRef: ChangeDetectorRef,
    private projectService: ProjectService, private router: Router, private dialog: MatDialog, private toast: NgToastService) { }


  OpenEditDialog(project: Project): void {
    // throw new Error('Method not implemented.');
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      data: { project }
    });

    dialogRef.componentInstance.projectUpdated.subscribe((updatedProject: Project) => {
      this.updateProjectInDataSource(updatedProject);

    });

  }
  updateProjectInDataSource(updatedProject: Project) {
    // console.log('u called')
    // throw new Error('Method not implemented.');
    const index = this.dataSource.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      console.log(index);
      // Update the existing project data
      const updatedDatasource = [...this.dataSource];

      updatedDatasource[index] = {
        id: updatedProject.id || '',
        position: this.dataSource[index].position,
        name: updatedProject.name,
        description: updatedProject.description,
        Manager: 'Dipa Majumdar' // Assuming Manager remains constant
      };
      this.dataSource = updatedDatasource;
      // Trigger change detection to update the UI
      this.changeDetectorRef.detectChanges();
    }
  }
  openConfirmDialog(id: string) {
    // throw new Error('Method not implemented.');
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        this.deleteProject(id);
      }
    })

  }
  deleteProject(id: string) {
    // throw new Error('Method not implemented.');
    this.projectService.deleteProject(id).subscribe(
      () => {
        this.dataSource = this.dataSource.filter(project => project.id !== id);
        this.changeDetectorRef.detectChanges();
        this.toast.success({ detail: "Success", summary: 'Project deleted successfully', duration: 3000 });

      },
      (error) => {
        console.error('Error deleting projects', error);
      }
    );
  }




  displayedColumns: string[] = ['position', 'name', 'description', 'Manager', 'Actions'];


  dataSource: PeriodicElement[] = [];

  ngOnInit() {




    this.loadProjects();


    this.projectDataService.projectData$.subscribe((project: Project | null) => {
      if (project) {
        // console.log(project);



        const newData: PeriodicElement = {
          id: project.id || '',
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
          id: project.id || '',
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

  selectProject(projectId: string, projectName: string) {
    this.router.navigate(['/project-details', projectId, projectName]);
  }





}

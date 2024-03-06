import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ProjectService } from '../../shared/project.service';
import { Project } from '../../models/project';
import { ProjectDataService } from '../../shared/project-data.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private matdialog: MatDialog, private projectDataService: ProjectDataService) { }
  openDialog() {
    const dialogref = this.matdialog.open(DialogBodyComponent, {

    });
    dialogref.componentInstance.projectCreated.subscribe((project: Project) => {
      this.projectDataService.updateProjectData(project);
    });
  }



}

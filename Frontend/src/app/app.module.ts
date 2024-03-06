import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';

import {MatSelectModule} from '@angular/material/select';

import {MatStepperModule} from '@angular/material/stepper';
import { ProjectSectionComponent } from './components/project-section/project-section.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { InitialProjectPageComponent } from './components/initial-project-page/initial-project-page.component';

import {MatTabsModule} from '@angular/material/tabs';
import { ApprovedTeamComponent } from './components/approved-team/approved-team.component';
import { ProjectResourcesComponent } from './components/project-resources/project-resources.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientFeedbackComponent } from './components/client-feedback/client-feedback.component';
import { ProjectUpdateComponent } from './components/project-update/project-update.component';
import { MomsMeetingComponent } from './components/moms-meeting/moms-meeting.component';
import { CommonModule } from '@angular/common';
import { ParticularProjectPageComponent } from './components/particular-project-page/particular-project-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: InitialProjectPageComponent },
  { path: 'all-projects', component: InitialProjectPageComponent },
  { path: 'project-details', component: ParticularProjectPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    DialogBodyComponent,
    ProjectSectionComponent,
    InitialProjectPageComponent,
    ApprovedTeamComponent,
    ProjectResourcesComponent,
    ClientFeedbackComponent,
    ProjectUpdateComponent,
    MomsMeetingComponent,
    ParticularProjectPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule
    ,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)

    
  
  ],

  providers: [
    provideAnimationsAsync()
  ],
  exports: [InitialProjectPageComponent,RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

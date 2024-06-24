import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { BudgetComponent } from './components/budget/budget.component';
import { AuditComponent } from './components/audit/audit.component';
import { DocumentComponent } from './components/document/document.component';
import { VersionComponent } from './components/version/version.component';
import { ScopeComponent } from './components/scope/scope.component';
import { EscalationComponent } from './components/escalation/escalation.component';
import { StakeholderComponent } from './components/stakeholder/stakeholder.component';
import { PhaseMilestoneComponent } from './components/phase-milestone/phase-milestone.component';
import { NgToastModule } from 'ng-angular-popup';

import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { RiskProfileComponent } from './components/risk-profile/risk-profile.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { InterceptorService } from './shared/interceptor.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
const routes: Routes = [
  { path: '', component: InitialProjectPageComponent },
  { path: 'all-projects', component: InitialProjectPageComponent },
  { path: 'project-details/:projectId/:projectName', component: ParticularProjectPageComponent },
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
    ParticularProjectPageComponent,
    BudgetComponent,
    AuditComponent,
    DocumentComponent,
    VersionComponent,
    ScopeComponent,
    EscalationComponent,
    StakeholderComponent,
    PhaseMilestoneComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SprintComponent,
    RiskProfileComponent,
    ProjectDescriptionComponent,
    ConfirmDialogComponent
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
    RouterModule.forRoot(routes),
    NgToastModule,
    AuthModule.forRoot({
      domain: 'dev-sszm8jsre62ahs7a.us.auth0.com',
      clientId: '7zdIYhM9GtI7NDh7rvYvvOZNPMr7BPZ6',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    MatDialogModule
   

    
  
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    },
   
    provideAnimationsAsync()
  ],
  exports: [InitialProjectPageComponent,RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentIdService } from '../../shared/document-id.service';
import { ApprovedTeam } from '../../models/approvedTeam';
import { ApprovedTeamService } from '../../shared/approved-team.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ResourceAllocationService } from '../../shared/resource-allocation.service';
import { ResourceAllocation } from '../../models/ResourceAllocation';
import { Feedback } from '../../models/Feedback';
import { FeedbackService } from '../../shared/feedback.service';
import { ProjectUpdate } from '../../models/ProjectUpdate';
import { ProjectUpdateService } from '../../shared/project-update.service';
import { Budget } from '../../models/Budget';
import { BudgetService } from '../../shared/budget.service';
import { Meeting } from '../../models/Meeting';
import { MeetingService } from '../../shared/meeting.service';
import { Audit } from '../../models/Audit';
import { AuditService } from '../../shared/audit.service';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderService } from '../../shared/stakeholder.service';
import { StakeholderDataService } from '../../shared/stakeholder-data.service';
import { ApprovedDataService } from '../../shared/approved-data.service';
import { ResourceDataService } from '../../shared/resource-data.service';
import { FeedbackDataService } from '../../shared/feedback-data.service';
import { MeetingDataService } from '../../shared/meeting-data.service';
import { AuthService } from '@auth0/auth0-angular';




export interface PeriodicElement {
  // id: string;
  title: string;
  // position: number;
  name: string;
  contact: string;
}
export interface PeriodicElementApproved {
  // id: string;
  phase: number;
  // position: number;
  numberOfResources: number;
  role: string;
  availabilityPercentage: number;
}
export interface PeriodicElementResource {

  allocationPercentage: number;
  start: Date;
  end: Date;
  role: string;
}

export interface PeriodicElementClientFeedback {

  // projectId: string;
  // feedbackType: number;
  feedbackType: string;
  dateReceived: Date;
  detailedFeedback: string;
  actionTaken: string;
}



export interface PeriodicElementMomsMeeting {

  // projectId: string;
  meetingDate: Date;
  moMLink: string;
  comments: string;
}



@Component({
  selector: 'app-particular-project-page',
  templateUrl: './particular-project-page.component.html',
  styleUrl: './particular-project-page.component.css'
})




export class ParticularProjectPageComponent implements OnInit {
 

  displayedColumns: string[] = ['title', 'name', 'contact'];
  displayedColumnsApproved: string[] = ['phase', 'numberOfResources', 'role', 'availabilityPercentage'];
  displayedColumnsResource: string[] = ['allocationPercentage', 'start', 'end', 'role'];
  displayedColumnsClientFeedback: string[] = ['feedbackType', 'dateReceived', 'detailedFeedback', 'actionTaken'];
  displayedColumnsMomsMeeting: string[] = ['meetingDate', 'moMLink', 'comments'];



  stakeholders: Stakeholder[] = [];

  approvedTeams: ApprovedTeam[] = [];
  resources: ResourceAllocation[] = [];
  clientFeedbacks: Feedback[] = [];
  projectUpdates: ProjectUpdate[] = [];
  projectBudget: Budget[] = [];
  momsMeeting: Meeting[] = [];
  audit: Audit[] = [];
  projectId: string = '';

  constructor(private route: ActivatedRoute, private approvedTeamService: ApprovedTeamService,
    private resourceAllocationService: ResourceAllocationService, private feedbackService: FeedbackService,
    private projectUpdateService: ProjectUpdateService, private budgetService: BudgetService, private meetingServics: MeetingService, private auditService: AuditService, private stakeService: StakeholderService, private changeDetectorRef: ChangeDetectorRef, private stakeDataService: StakeholderDataService, private approvedDataService: ApprovedDataService, private resourceDataService: ResourceDataService, private feedbackDataService: FeedbackDataService,private meetingDataService:MeetingDataService,public auth: AuthService) { }





  dataSource: PeriodicElement[] = [];
  dataSourceApproved: PeriodicElementApproved[] = [];
  dataSourceResource: PeriodicElementResource[] = [];
  dataSourceClientFeedback: PeriodicElementClientFeedback[] = [];
  dataSourceMomsMeeting: PeriodicElementMomsMeeting[] = [];



  projectName: string = '';
  // someCondition: boolean = false;
  userProfile: string | null = null;
  userEmail: string | null = null;
  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      if (profile) {
        this.userProfile = JSON.stringify(profile, null, 2);
      const userProfileObject = profile as any; // Assuming profile is of type 'any' for simplicity
      this.userEmail = userProfileObject.email;
      }
      else {
        this.userProfile = null;
        this.userEmail = null;
      }
      
    });

   
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectName = params['projectName'];


   
   

    })

    this.loadStakeholder();
    this.loadApprovedTeam();
    this.loadResource();
    this.loadClientFeedback();
    this.loadMomsMeeting();

    this.meetingDataService.MeetingDataData$.subscribe((momsMeeting: Meeting | null) => {
      if (momsMeeting) {
        // console.log(project);



        const newData: PeriodicElementMomsMeeting = {
          meetingDate: momsMeeting.meetingDate,
          moMLink: momsMeeting.moMLink,
          comments: momsMeeting.comments



        };
        this.dataSourceMomsMeeting = [...this.dataSourceMomsMeeting, newData];
        this.changeDetectorRef.detectChanges();
      }
    })



    this.feedbackDataService.FeedbackDataData$.subscribe((clientFeedback: Feedback | null) => {
      if (clientFeedback) {
        // console.log(project);



        const newData: PeriodicElementClientFeedback = {


          feedbackType: clientFeedback.feedbackType,
          dateReceived: clientFeedback.dateReceived,
          detailedFeedback: clientFeedback.detailedFeedback,
          actionTaken: clientFeedback.actionTaken




        };
        // console.log(newData);
        this.dataSourceClientFeedback = [...this.dataSourceClientFeedback, newData];
        // console.log(this.dataSource);
        this.changeDetectorRef.detectChanges();
      }
    })




    this.approvedDataService.ApprovedDataData$.subscribe((approvedTeam: ApprovedTeam | null) => {
      if (approvedTeam) {
        // console.log(project);



        const newData: PeriodicElementApproved = {
          phase: approvedTeam.phase,

          numberOfResources: approvedTeam.numberOfResources,
          role: approvedTeam.role,
          availabilityPercentage: approvedTeam.availabilityPercentage


        };
        // console.log(newData);
        this.dataSourceApproved = [...this.dataSourceApproved, newData];
        // console.log(this.dataSource);
        this.changeDetectorRef.detectChanges();
      }
    })


    this.stakeDataService.stakeholderData$.subscribe((stakeholder: Stakeholder | null) => {
      if (stakeholder) {
        // console.log(project);



        const newData: PeriodicElement = {
          title: stakeholder.title,
          name: stakeholder.name,
          contact: stakeholder.contact

        };
        console.log(newData);
        this.dataSource = [...this.dataSource, newData];
        console.log(this.dataSource);
        this.changeDetectorRef.detectChanges();
      }
    })


    this.resourceDataService.ResourceDataData$.subscribe((resource: ResourceAllocation | null) => {
      if (resource) {
        // console.log(project);



        const newData: PeriodicElementResource = {
          allocationPercentage: resource.allocationPercentage,
          start: resource.start,
          end: resource.end,
          role: resource.role


        };
        console.log(newData);
        this.dataSourceResource = [...this.dataSourceResource, newData];
        // console.log(this.dataSource);
        this.changeDetectorRef.detectChanges();
      }
    })




  }

  loadMomsMeeting(): void {
    this.meetingServics.getAllMeetings().subscribe(
      (response: any) => {
        // console.log('stakeholders:', response.items);
        this.momsMeeting = response.items;
        const id = this.projectId;
        this.momsMeeting = this.momsMeeting.filter(team => team.projectId === id);
        console.log(this.momsMeeting);

        this.dataSourceMomsMeeting = this.momsMeeting.map((meeting, index) => ({


          meetingDate: meeting.meetingDate,
          moMLink: meeting.moMLink,
          comments: meeting.comments

        }));
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error loading moms meeting:', error);
      }
    )
  }


  loadClientFeedback(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      (response: any) => {
        // console.log('stakeholders:', response.items);
        this.clientFeedbacks = response.items;
        const id = this.projectId;
        this.clientFeedbacks = this.clientFeedbacks.filter(team => team.projectId === id);
        console.log(this.clientFeedbacks);

        this.dataSourceClientFeedback = this.clientFeedbacks.map((clientFeedback, index) => ({


          feedbackType: this.getFeedbackFromType(clientFeedback.feedbackType),
          dateReceived: clientFeedback.dateReceived,
          detailedFeedback: clientFeedback.detailedFeedback,
          actionTaken: clientFeedback.actionTaken


        }));
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error loading client feedbacks:', error);
      }
    )
  }



  loadResource(): void {
    this.resourceAllocationService.getAllResourceAllocations().subscribe(
      (response: any) => {
        // console.log('stakeholders:', response.items);
        this.resources = response.items;
        const id = this.projectId;
        this.resources = this.resources.filter(team => team.projectId === id);
        console.log(this.resources);

        this.dataSourceResource = this.resources.map((resource, index) => ({
          allocationPercentage: resource.allocationPercentage,
          start: resource.start,
          end: resource.end,
          role: resource.role

        }));
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error loading resources:', error);
      }
    )
  }













  loadApprovedTeam(): void {
    this.approvedTeamService.getAllApprovedTeams().subscribe(
      (response: any) => {
        // console.log('stakeholders:', response.items);
        this.approvedTeams = response.items;
        const id = this.projectId;
        this.approvedTeams = this.approvedTeams.filter(team => team.projectId === id);

        this.dataSourceApproved = this.approvedTeams.map((approvedTeam, index) => ({
          phase: approvedTeam.phase,

          numberOfResources: approvedTeam.numberOfResources,
          role: approvedTeam.role,
          availabilityPercentage: approvedTeam.availabilityPercentage


        }));
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    )
  }

  loadStakeholder(): void {
    this.stakeService.getAllStakeholders().subscribe(
      (response: any) => {
        console.log('stakeholders:', response.items);
        this.stakeholders = response.items;
        const id = this.projectId;
        this.stakeholders = this.stakeholders.filter(team => team.projectId === id);

        this.dataSource = this.stakeholders.map((stakeholder, index) => ({
          title: this.getTitleFromType(stakeholder.title),
          name: stakeholder.name,
          contact: stakeholder.contact
        }));




        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    )
  }


  getTitleFromType(type: any): string {
    switch (type) {
      case 0:
        return 'Project manager';
      case 1:
        return 'Client';
      case 2:
        return 'Account manager';
      default:
        return '';
    }
  }

  getFeedbackFromType(type: any): string {
    switch (type) {
      case 0:
        return 'Complaint';
      case 1:
        return 'Appreciation';
      default:
        return '';
    }
  }











































































































  fetchDataAndDownloadPDF(): void {
    this.approvedTeamService.getAllApprovedTeams().subscribe(
      (response: any) => {
        console.log('All approved teams:', response.items);
        this.approvedTeams = response.items;

        const id = this.projectId;
        this.approvedTeams = this.approvedTeams.filter(team => team.projectId === id);
        this.resourceAllocationService.getAllResourceAllocations().subscribe(
          (response: any) => {
            console.log('resource items', response);
            this.resources = response.items;
            this.resources = this.resources.filter(team => team.projectId === id);
            this.feedbackService.getAllFeedbacks().subscribe(
              (response: any) => {
                console.log('feedback items', response);
                this.clientFeedbacks = response.items;
                this.clientFeedbacks = this.clientFeedbacks.filter((item) => item.projectId === id);
                this.projectUpdateService.getAllProjectUpdates().subscribe(
                  (response: any) => {
                    console.log('all project feedbacks', response);
                    this.projectUpdates = response.items;
                    this.projectUpdates = this.projectUpdates.filter(((item) => item.projectId === id));
                    this.budgetService.getAllBudgets().subscribe(
                      (response: any) => {
                        console.log('all project budget', response);
                        this.projectBudget = response.items;
                        this.projectBudget = this.projectBudget.filter(((item) => item.projectId === id));
                        this.meetingServics.getAllMeetings().subscribe(
                          (response: any) => {
                            console.log('all meetings', response);
                            this.momsMeeting = response.items;
                            this.momsMeeting = this.momsMeeting.filter((item) => item.projectId === id);
                            this.auditService.getAllAudits().subscribe(
                              (response: any) => {
                                console.log('all audits', response);
                                this.audit = response.items;
                                this.audit = this.audit.filter((item) => item.projectId === id);
                                // console.log(this.audit);
                                this.generatePdf();

                              },
                              error => {
                                console.error('Error getting all Audits for the Project', error);
                              }
                            )

                            // this.generatePdf();

                          },
                          error => {
                            console.error('Error fetching meeting', error);
                          }
                        )
                        // this.generatePdf();
                      },
                      error => {
                        console.error('Error fetching project budget:', error);
                      }
                    )
                    // this.generatePdf();

                  },
                  error => {
                    console.error('Error fetching project update:', error);
                  }
                )
                // this.generatePdf();
              },
              error => {
                console.error('Error fetching Client Feedback:', error);
              }
            )
            // this.generatePdf();
          },
          error => {
            console.error('Error fetching resource:', error);
          }
        );
        // this.generatePdf();

      },
      error => {
        console.error('Error fetching approved teams:', error);
      }
    );
  }












  generatePdf(): void {
    const doc = new jsPDF();
    let yPos = 20;
    // doc.setFontSize(16);
    // doc.text('Approved Teams Report', 10, yPos);
    yPos += 10;

    // Print approved teams section
    if (this.approvedTeams && this.approvedTeams.length > 0) {
      const approvedTeamHeaders = ['Project ID', 'Phase', 'Number of Resources', 'Role', 'Availability Percentage', 'Duration'];
      const approvedTeamData = this.approvedTeams.map(team => [
        team.projectId,
        team.phase.toString(),
        team.numberOfResources.toString(),
        team.role,
        team.availabilityPercentage.toString(),
        team.duration.toString()
      ]);
      yPos = this.printSection(doc, 'Approved Teams', approvedTeamHeaders, approvedTeamData, yPos);
    } else {
      doc.setFontSize(12);
      doc.text('No content available here', 10, yPos);
      yPos += 20; // Adjust vertical spacing
    }

    yPos += 10;
    // doc.setFontSize(16);
    // doc.text('Resource Report', 10, yPos);
    yPos += 10;

    // Print resources section
    if (this.resources && this.resources.length > 0) {
      const resourceHeaders = ['Project ID', 'Allocation Percentage', 'Start', 'End', 'Role'];
      const resourceData = this.resources.map(resource => [
        resource.projectId,
        resource.allocationPercentage.toString(),
        resource.start.toString(),
        resource.end.toString(),
        resource.role
      ]);
      yPos = this.printSection(doc, 'Resources', resourceHeaders, resourceData, yPos);
    } else {
      doc.setFontSize(12);
      doc.text('No content available here', 10, yPos);
      yPos += 20; // Adjust vertical spacing
    }

    if (this.clientFeedbacks && this.clientFeedbacks.length > 0) {
      const clientFeedbacksHeaders = ['Project ID', 'feedbackType', 'dateReceived', 'detailedFeedback', 'actionTaken', 'closureDate'];
      const clientFeedbacksData = this.clientFeedbacks.map(feedback => [
        feedback.projectId,
        feedback.feedbackType.toString(),
        feedback.dateReceived.toString(),
        feedback.detailedFeedback,
        feedback.actionTaken,
        feedback.closureDate.toString()
      ]);
      yPos = this.printSection(doc, 'Client Feedback', clientFeedbacksHeaders, clientFeedbacksData, yPos);
    } else {
      doc.setFontSize(12);
      doc.text('No content available here', 10, yPos);
      yPos += 20; // Adjust vertical spacing
    }


    if (this.projectUpdates && this.projectUpdates.length > 0) {
      const projectUpdatesHeaders = ['Project ID', 'date', 'generalUpdates'];
      const projectUpdatesData = this.projectUpdates.map(projectUpdate => [
        projectUpdate.projectId,
        projectUpdate.date.toString(),
        projectUpdate.generalUpdates

      ]);
      yPos = this.printSection(doc, 'Project Update', projectUpdatesHeaders, projectUpdatesData, yPos);
    } else {
      doc.setFontSize(12);
      doc.text('No content available here', 10, yPos);
      yPos += 20; // Adjust vertical spacing
    }




    if (this.projectBudget && this.projectBudget.length > 0) {
      const projectBudgetHeaders = ['type', 'durationInMonths', 'contractDuration', 'budgetedHours', 'budgetedCost', 'currency', 'projectId'];
      const projectBudgetData = this.projectBudget.map(budget => [
        budget.type,
        budget.durationInMonths.toString(),
        budget.contractDuration.toString(),
        budget.budgetedHours.toString(),
        budget.budgetedCost.toString(),
        budget.currency,
        budget.projectId


      ]);
      yPos = this.printSection(doc, 'Project Budget', projectBudgetHeaders, projectBudgetData, yPos);
    } else {
      doc.setFontSize(12);
      doc.text('No content available here', 10, yPos);
      yPos += 20; // Adjust vertical spacing
    }



    if (this.momsMeeting && this.momsMeeting.length > 0) {
      const momsMeetingHeaders = ['projectId', 'meetingDate', 'moMLink', 'comments'];
      const momsMeetingData = this.momsMeeting.map(item => [
        item.projectId,
        item.meetingDate.toString(),
        item.moMLink,
        item.comments


      ]);
      yPos = this.printSection(doc, 'Meeting data', momsMeetingHeaders, momsMeetingData, yPos);
    } else {
      doc.setFontSize(12);
      doc.text('No content available here', 10, yPos);
      yPos += 20;
    }







    if (this.audit && this.audit.length > 0) {
      const auditHeaders = ['projectId', 'dateOfAudit', 'reviewedBy', 'status', 'reviewedSection', 'commentQueries', 'actionItem'];
      const auditData = this.audit.map(item => [
        item.projectId,
        item.dateOfAudit.toString(),
        item.reviewedBy,
        item.status,
        item.reviewedSection,
        item.commentQueries,
        item.actionItem



      ]);
      yPos = this.printSection(doc, 'Audit History data', auditHeaders, auditData, yPos);
    } else {
      doc.setFontSize(12);
      doc.text('No content available here', 10, yPos);
      yPos += 20;
    }






    doc.save('project_details.pdf');
  }




  printSection(doc: any, title: string, headers: string[], data: any[][], yPos: number): number {
    const startY = yPos; // Initial y position for the section
    let currentPage = doc.internal.getCurrentPageInfo().pageNumber;

    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(title, 10, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 255);
    doc.text(headers.join(', '), 10, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(0);

    const maxWidth = 180; // Maximum width for wrapping
    let rowHeight = 0;

    data.forEach(row => {
      let xPos = 10; // Initial x position for each row
      let lines: string[] = [];

      row.forEach(cell => {
        const text = cell.toString();
        const cellLines = doc.splitTextToSize(text, maxWidth);
        lines.push(...cellLines); // Add lines for this cell to the array
      });

      // Calculate the height needed for this row
      const lineHeight = 10; // Height of each line
      const numLines = Math.max(...lines.map(line => doc.getTextDimensions(line).h));
      const rowHeightForRow = numLines * lineHeight;

      // Check if adding this row exceeds the page height
      if (yPos + rowHeightForRow > doc.internal.pageSize.height - 20) {
        doc.addPage(); // Add a new page
        currentPage++;

        yPos = 10;

        // Reprint section headers
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(title, 10, yPos);
        yPos += 10;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 255);
        doc.text(headers.join(', '), 10, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(0);
      }


      lines.forEach(line => {
        doc.text(line, xPos, yPos);
        yPos += lineHeight; // Move to the next line
      });


      rowHeight = Math.max(rowHeight, rowHeightForRow);
    });

    yPos += 5; // Add some padding between rows


    return yPos;
  }










}








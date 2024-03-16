





using Microsoft.AspNetCore.Mvc;
using Promact.CustomerSuccess.Platform.Entities;

using MailKit.Net.Smtp;
using MailKit.Security;

using MimeKit;

namespace Promact.CustomerSuccess.Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost("sendEmail")]
        public IActionResult SendEmail([FromBody] EmailRequest request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            //var emailBody = getEmailBody(auditData);
            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBody(stakeholder, request.AuditData);
                SendEmail(stakeholder.Contact, "Audit History Updated", emailBody);
                
            }



            //SendEmail("mrahulmaity623@gmail.com", "Audit History Updated", emailBody);

            return Ok();
        }




        [HttpPost("sendEmailApprovedTeam")]
        public IActionResult sendEmailApprovedTeam([FromBody] EmailRequestApprovedTeam request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyApprovedTeam(stakeholder, request.ApprovedData);
                SendEmail(stakeholder.Contact, "ApprovedTeam History Updated", emailBody);

            }


            return Ok();
        }

        [HttpPost("sendEmailBudget")]
        public IActionResult sendEmailBudget([FromBody] EmailRequestBudget request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyBudget(stakeholder, request.BudgetData);
                SendEmail(stakeholder.Contact, "Project Budget Updated", emailBody);

            }


            return Ok();
        }


        [HttpPost("sendEmailMeeting")]
        public IActionResult sendEmailMeeting([FromBody] EmailRequestMeeting request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyMeeting(stakeholder, request.MeetingData);
                SendEmail(stakeholder.Contact, "Meeting Minute Updated", emailBody);

            }


            return Ok();
        }


        [HttpPost("sendEmailClientFeedback")]
        public IActionResult sendEmailClientFeedback([FromBody] EmailRequestClientFeedback request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyClientFeedback(stakeholder, request.FeedbackData);
                SendEmail(stakeholder.Contact, "ClientFeedback Updated", emailBody);

            }


            return Ok();
        }

        [HttpPost("sendEmailResource")]
        public IActionResult sendEmailResource([FromBody] EmailRequestResource request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyProjectResource(stakeholder, request.resourceAllocationData);
                SendEmail(stakeholder.Contact, "Project Resource Updated", emailBody);

            }


            return Ok();
        }


        [HttpPost("sendEmailProjectUpdate")]
        public IActionResult sendEmailProjectUpdate([FromBody] EmailRequestProjectUpdate request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyProjectUpdate(stakeholder, request.projectUpdateData);
                SendEmail(stakeholder.Contact, "Project related Updates", emailBody);

            }


            return Ok();
        }


        [HttpPost("sendEmailProjectDocument")]
        public IActionResult sendEmailProjectDocument([FromBody] EmailRequestProjectDocument request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyProjectDocument(stakeholder, request.documentData);
                SendEmail(stakeholder.Contact, "Project Document Updates", emailBody);

            }
             return Ok();
        }


        [HttpPost("sendEmailDocumentVersion")]
        public IActionResult sendEmailDocumentVersion([FromBody] EmailRequestDocumentVersion request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyDocumentVersion(stakeholder, request.versionData);
                SendEmail(stakeholder.Contact, "Project Document version Updates", emailBody);

            }
            return Ok();
        }


        [HttpPost("sendEmailProjectScope")]
        public IActionResult sendEmailProjectScope([FromBody] EmailRequestProjectScope request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyProjectScope(stakeholder, request.scopeData);
                SendEmail(stakeholder.Contact, "Project Scope Updates", emailBody);

            }
            return Ok();
        }

        [HttpPost("sendEmailPhaseMileStone")]
        public IActionResult sendEmailPhaseMileStone([FromBody] EmailRequestPhaseMileStone request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }


            foreach (var stakeholder in request.Stakeholders)
            {
                var emailBody = getEmailBodyPhaseMilestone(stakeholder, request.phaseMileStoneData);
                SendEmail(stakeholder.Contact, "Project Phase Milestone Updates", emailBody);

            }
            return Ok();
        }
        private string getEmailBodyPhaseMilestone(Stakeholder stakeholder, PhaseMilestone phaseMileStoneData)
        {
            return $"<p>Hello Mr./Ms. {stakeholder.Name}</p>" +
                $"<p>New Phase Milestone for this projectid: {phaseMileStoneData.ProjectId}</p>" +

                     $"<p>Title: {phaseMileStoneData.Title}</p>" +
                      $"<p>StartDate: {phaseMileStoneData.StartDate}</p>" +
                       $"<p>End Date: {phaseMileStoneData.EndDate}</p>" +
                        $"<p>Status: {phaseMileStoneData.Status}</p>" +
                         $"<p>Comments: {phaseMileStoneData.Comments}</p>" 


                 ;
        }


        private string getEmailBodyProjectScope(Stakeholder stakeholder, Scope scopeData)
        {
            return $"<p>Hello Mr./Ms. {stakeholder.Name}</p>" +
                $"<p>New Project scope changes for this projectid: {scopeData.ProjectId}</p>" +

                     $"<p>IncludedItems: {scopeData.IncludedItems}</p>" +
                      $"<p>ExcludedItems: {scopeData.ExcludedItems}</p>" +
                                $"<p>AdditionalNotes: {scopeData.AdditionalNotes}</p>"

                 ;
        }



        private string getEmailBodyDocumentVersion(Stakeholder stakeholder, DocumentVersion versionData)
        {
            return $"<p>Hello Mr./Ms. {stakeholder.Name}</p>" +
                $"<p>New Project Document Version Updated : {versionData.DocumentId}</p>" +

                     $"<p>ChangeType: {versionData.ChangeType}</p>" +
                      $"<p>Changes: {versionData.Changes}</p>" +
                                $"<p>ChangeReason: {versionData.ChangeReason}</p>"

                 ;
        }


        private string getEmailBodyProjectDocument(Stakeholder stakeholder, Document documentData)
        {
            return $"<p>Hello Mr./Ms. {stakeholder.Name}</p>" +
                $"<p>New Project Document Updated for project ID: {documentData.ProjectId}</p>" +

                     $"<p>Name: {documentData.Name}</p>" +
                      $"<p>Description: {documentData.Description}</p>"+
                                $"<p>Url: {documentData.Url}</p>" 

                 ;
        }




        private string getEmailBodyProjectUpdate(Stakeholder stakeholder, ProjectUpdate projectUpdateData)
        {
            return $"<p>Hello Mr./Ms. {stakeholder.Name}</p>" +
                $"<p>New Project Update for project ID: {projectUpdateData.ProjectId}</p>" +
                     
                     $"<p>Date: {projectUpdateData.Date}</p>" +
                      $"<p>GeneralUpdates: {projectUpdateData.GeneralUpdates}</p>" 
                   

                 ;
        }



        private string getEmailBodyProjectResource(Stakeholder stakeholder, ProjectResources resourceAllocationData)
        {
            return $"<p>Hello : {stakeholder.Name}</p>" +
                $"<p>New Project resource for project ID: {resourceAllocationData.ProjectId}</p>" +
                     //$"<p>FeedbackType: {ClientFeedbackData.FeedbackType}</p>" +
                     $"<p>AllocationPercentage : {resourceAllocationData.AllocationPercentage}</p>" +
                     $"<p>Start date: {resourceAllocationData.Start}</p>" +
                      $"<p>End Date: {resourceAllocationData.End}</p>" +
                      $"<p>role: {resourceAllocationData.Role}</p>"


                 ;
        }


        private string getEmailBodyClientFeedback(Stakeholder stakeholder, ClientFeedback FeedbackData)
        {
            return $"<p>Hello : {stakeholder.Name}</p>" +
                $"<p>New Client Feedback for project ID: {FeedbackData.ProjectId}</p>" +
                     //$"<p>FeedbackType: {ClientFeedbackData.FeedbackType}</p>" +
                     $"<p>DateReceived : {FeedbackData.DateReceived}</p>" +
                     $"<p>Detailed Feedback: {FeedbackData.DetailedFeedback}</p>" +
                      $"<p>ActionTaken: {FeedbackData.ActionTaken}</p>" +
                      $"<p>ClosureDate: {FeedbackData.ClosureDate}</p>" 


                 ;
        }




        private string getEmailBodyMeeting(Stakeholder stakeholder, MeetingMinute MeetingData)
        {
            return $"<p>Hello : {stakeholder.Name}</p>" +
                $"<p>New Meeting Sheduled for project ID: {MeetingData.ProjectId}</p>" +
                     $"<p>MeetingDate: {MeetingData.MeetingDate}</p>" +
                     $"<p>MoMLink : {MeetingData.MoMLink}</p>" +
                     $"<p>Comment: {MeetingData.Comments}</p>" 
                   
                 ;
        }



        private string getEmailBodyBudget(Stakeholder stakeholder, ProjectBudget BudgetData)
        {
            return $"<p>Hello : {stakeholder.Name}</p>" +
                $"<p>New Budget has been created for project ID: {BudgetData.ProjectId}</p>" +
                     $"<p>Type: {BudgetData.Type}</p>" +
                     $"<p>Budgeted Hours : {BudgetData.BudgetedHours}</p>" +
                     $"<p>Cost in Budget: {BudgetData.BudgetedCost}</p>" +
                     $"<p>Currencyy: {BudgetData.Currency}</p>" +
                     $"<p>Duration in months: {BudgetData.DurationInMonths}</p>"
                 ;
        }

        private string getEmailBody(Stakeholder stakeholder, AuditHistory auditData)
        {
            return $"<p>Hello : {stakeholder.Name}</p>" +
                $"<p>New audit has been created for project ID: {auditData.ProjectId}</p>" +
                     $"<p>Date of Audit: {auditData.DateOfAudit}</p>" +
                     $"<p>Reviewed By: {auditData.ReviewedBy}</p>" +
                     $"<p>Status: {auditData.Status}</p>" +
                     $"<p>Reviewed Section: {auditData.ReviewedSection}</p>" +
                     $"<p>Comment Queries: {auditData.CommentQueries}</p>" +
                     $"<p>Action Item: {auditData.ActionItem}</p>";
        }



        private string getEmailBodyApprovedTeam(Stakeholder stakeholder, ApprovedTeam ApprovedData)
        {
            return $"<p>Hello : {stakeholder.Name}</p>" +
                $"<p>New audit has been created for project ID: {ApprovedData.ProjectId}</p>" +
                     $"<p>Phase: {ApprovedData.Phase}</p>" +
                     $"<p>NumberOfResources : {ApprovedData.NumberOfResources}</p>" +
                     $"<p>Role: {ApprovedData.Role}</p>" +
                     $"<p>AvailabilityPercentage Section: {ApprovedData.AvailabilityPercentage}</p>" +
                     $"<p>Duration: {ApprovedData.Duration}</p>" 
                 ;
        }

        private void SendEmail(string userEmail, string subject, string body)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("mrahulmaity623@gmail.com"));
            email.To.Add(MailboxAddress.Parse(userEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = body
            };

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("mrahulmaity623@gmail.com", "phoawtyveyvpdsqd");
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
    public class EmailRequest
    {
        public List<Stakeholder> Stakeholders { get; set; }
        public AuditHistory AuditData { get; set; }
        //public ApprovedTeam ApprovedTeam { get; set; }
    }

    public class EmailRequestApprovedTeam
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public ApprovedTeam ApprovedData { get; set; }
    }
    public class EmailRequestBudget
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public ProjectBudget BudgetData{ get; set; }
    }


    public class EmailRequestMeeting
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public MeetingMinute MeetingData { get; set; }
    }

    public class EmailRequestClientFeedback
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public ClientFeedback FeedbackData{ get; set; }
    }
    public class EmailRequestResource
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public ProjectResources resourceAllocationData { get; set; }
    }

    public class EmailRequestProjectUpdate
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public ProjectUpdate projectUpdateData { get; set; }
    }

    public class EmailRequestProjectDocument
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public Document documentData { get; set; }
    }

    public class EmailRequestDocumentVersion
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public DocumentVersion versionData { get; set; }
    }

    public class EmailRequestProjectScope
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public Scope scopeData { get; set; }
    }

    public class EmailRequestPhaseMileStone
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public PhaseMilestone phaseMileStoneData { get; set; }
    }



}
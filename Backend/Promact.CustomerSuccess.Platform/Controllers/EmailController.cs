





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
            




            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello Mr./Ms. {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New Phase Milestone for project ID: {phaseMileStoneData.ProjectId}</p>
                    <p><strong>Title:</strong> {phaseMileStoneData.Title}</p>
                    <p><strong>Start Date:</strong> {phaseMileStoneData.StartDate}</p>
                    <p><strong>End Date:</strong> {phaseMileStoneData.EndDate}</p>
                    <p><strong>Status:</strong> {phaseMileStoneData.Status}</p>
                    <p><strong>Comments:</strong> {phaseMileStoneData.Comments}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }


        private string getEmailBodyProjectScope(Stakeholder stakeholder, Scope scopeData)
        {
           



            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello Mr./Ms. {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New Project scope changes for project ID: {scopeData.ProjectId}</p>
                    <p><strong>Included Items:</strong> {scopeData.IncludedItems}</p>
                    <p><strong>Excluded Items:</strong> {scopeData.ExcludedItems}</p>
                    <p><strong>Additional Notes:</strong> {scopeData.AdditionalNotes}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }



        private string getEmailBodyDocumentVersion(Stakeholder stakeholder, DocumentVersion versionData)
        {
           


            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello Mr./Ms. {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New Project Document Version Updated for Document ID: {versionData.DocumentId}</p>
                    <p><strong>Change Type:</strong> {versionData.ChangeType}</p>
                    <p><strong>Changes:</strong> {versionData.Changes}</p>
                    <p><strong>Change Reason:</strong> {versionData.ChangeReason}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }


        private string getEmailBodyProjectDocument(Stakeholder stakeholder, Document documentData)
        {
          


            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello Mr./Ms. {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New Project Document Updated for project ID: {documentData.ProjectId}</p>
                    <p><strong>Name:</strong> {documentData.Name}</p>
                    <p><strong>Description:</strong> {documentData.Description}</p>
                    <p><strong>Url:</strong> {documentData.Url}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }




        private string getEmailBodyProjectUpdate(Stakeholder stakeholder, ProjectUpdate projectUpdateData)
        {
           

            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello Mr./Ms. {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New Project Update for project ID: {projectUpdateData.ProjectId}</p>
                    <p><strong>Date:</strong> {projectUpdateData.Date}</p>
                    <p><strong>General Updates:</strong> {projectUpdateData.GeneralUpdates}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }



        private string getEmailBodyProjectResource(Stakeholder stakeholder, ProjectResources resourceAllocationData)
        {
          


            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello Mr./Ms. {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New Project resource for project ID: {resourceAllocationData.ProjectId}</p>
                    <p><strong>Allocation Percentage:</strong> {resourceAllocationData.AllocationPercentage}</p>
                    <p><strong>Start Date:</strong> {resourceAllocationData.Start}</p>
                    <p><strong>End Date:</strong> {resourceAllocationData.End}</p>
                    <p><strong>Role:</strong> {resourceAllocationData.Role}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }


        private string getEmailBodyClientFeedback(Stakeholder stakeholder, ClientFeedback FeedbackData)
        {
            return $"<p>Hello Mr./Ms. {stakeholder.Name}</p>" +
                $"<p>New Client Feedback for project ID: {FeedbackData.ProjectId}</p>" +

                     $"<p>DateReceived : {FeedbackData.DateReceived}</p>" +
                     $"<p>Detailed Feedback: {FeedbackData.DetailedFeedback}</p>" +
                      $"<p>ActionTaken: {FeedbackData.ActionTaken}</p>" +
                      $"<p>ClosureDate: {FeedbackData.ClosureDate}</p>";



        }




        private string getEmailBodyMeeting(Stakeholder stakeholder, MeetingMinute MeetingData)
        {
           



            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New Meeting Scheduled for project ID: {MeetingData.ProjectId}</p>
                    <p><strong>Meeting Date:</strong> {MeetingData.MeetingDate}</p>
                    <p><strong>MoM Link:</strong> {MeetingData.MoMLink}</p>
                    <p><strong>Comment:</strong> {MeetingData.Comments}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }



        private string getEmailBodyBudget(Stakeholder stakeholder, ProjectBudget BudgetData)
        {
            

            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New Budget has been created for project ID: {BudgetData.ProjectId}</p>
                    <p><strong>Type:</strong> {BudgetData.Type}</p>
                    <p><strong>Budgeted Hours:</strong> {BudgetData.BudgetedHours}</p>
                    <p><strong>Cost in Budget:</strong> {BudgetData.BudgetedCost}</p>
                    <p><strong>Currency:</strong> {BudgetData.Currency}</p>
                    <p><strong>Duration in months:</strong> {BudgetData.DurationInMonths}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }

        private string getEmailBody(Stakeholder stakeholder, AuditHistory auditData)
        {
            

            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New audit has been created for project ID: {auditData.ProjectId}</p>
                    <p><strong>Date of Audit:</strong> {auditData.DateOfAudit}</p>
                    <p><strong>Reviewed By:</strong> {auditData.ReviewedBy}</p>
                    <p><strong>Status:</strong> {auditData.Status}</p>
                    <p><strong>Reviewed Section:</strong> {auditData.ReviewedSection}</p>
                    <p><strong>Comment Queries:</strong> {auditData.CommentQueries}</p>
                    <p><strong>Action Item:</strong> {auditData.ActionItem}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
        }



        private string getEmailBodyApprovedTeam(Stakeholder stakeholder, ApprovedTeam ApprovedData)
        {
           

            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }}
                .content {{
                    padding: 20px;
                    background-color: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Hello {stakeholder.Name}</h1>
                </div>
                <div class='content'>
                    <p>New audit has been created for project ID: {ApprovedData.ProjectId}</p>
                    <p><strong>Phase:</strong> {ApprovedData.Phase}</p>
                    <p><strong>Number of Resources:</strong> {ApprovedData.NumberOfResources}</p>
                    <p><strong>Role:</strong> {ApprovedData.Role}</p>
                    <p><strong>Availability Percentage:</strong> {ApprovedData.AvailabilityPercentage}</p>
                    <p><strong>Duration:</strong> {ApprovedData.Duration}</p>
                    <p>Thanks and Regards,</p>
                    <p><em>Promact Infotech Pvt Ltd</em></p>
                </div>
                <div class='footer'>
                    <p>&copy; {DateTime.Now.Year} Promact Infotech Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
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






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

        //[HttpPost("sendEmailResource")]
        //public IActionResult sendEmailResource([FromBody] EmailRequestResource request)
        //{
        //    if (!ModelState.IsValid) { return BadRequest(ModelState); }


        //    foreach (var stakeholder in request.Stakeholders)
        //    {
        //        var emailBody = getEmailBodyMeeting(stakeholder, request.MeetingData);
        //        SendEmail(stakeholder.Contact, "Meeting Minute Updated", emailBody);

        //    }


        //    return Ok();
        //}



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

    public class EmailRequestResource
    {
        public List<Stakeholder> Stakeholders { get; set; }
        //public AuditHistory AuditData { get; set; }
        public ProjectResources ResourceData { get; set; }
    }


}
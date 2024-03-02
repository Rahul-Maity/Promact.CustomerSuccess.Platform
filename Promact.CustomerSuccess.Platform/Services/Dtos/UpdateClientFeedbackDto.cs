using Promact.CustomerSuccess.Platform.Entities;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateClientFeedbackDto
    {
        [Required]
        [StringLength(128)]
        public DateTime FeedbackDate { get; set; }
        public FeedbackType FeedbackType { get; set; }
        public required string Details { get; set; }
        public virtual Project? Project { get; set; }

    }
}

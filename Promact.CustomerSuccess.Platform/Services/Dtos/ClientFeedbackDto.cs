﻿using Promact.CustomerSuccess.Platform.Entities;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ClientFeedbackDto: IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public DateTime FeedbackDate { get; set; }
        public FeedbackType FeedbackType { get; set; }
        public required string Details { get; set; }
        public virtual Project? Project { get; set; }
       
    }
}
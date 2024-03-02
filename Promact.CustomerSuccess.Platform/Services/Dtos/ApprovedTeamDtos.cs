﻿
using Volo.Abp.Application.Dtos;

//namespace Acme.TestAbp.Services.Dtos
namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ApprovedTeamDto:IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public string TeamName { get; set; }
        public int NumberOfResources { get; set; }
        public string Role { get; set; }
        public int AvailabilityPercentage { get; set; }
        public DateTime Duration { get; set; }
    }

  

  
}

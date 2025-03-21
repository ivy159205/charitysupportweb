using Charity_Website_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Charity_Website_API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class CampaignMed : ControllerBase
    {
        DBCNhom1 dbc;

        public CampaignMed(DBCNhom1 dbc)
        {
            this.dbc = dbc;
        }

        [HttpGet]
        [Route("GetList")]

        public IActionResult GetList()
        {
            return Ok(dbc.TblCampaignMedia.ToList());
        }
        

        [HttpPost]
        [Route("Insert")]

        public IActionResult AddCampaignMed(String m_media_id, String m_campaign_id, String m_media_type, String m_media_url)
        {
            TblCampaignMedium camMed = new TblCampaignMedium();
            camMed.MMediaId = m_media_id;
            camMed.MCampaignId = m_campaign_id;
            camMed.MMediaType = m_media_type;
            camMed.MMediaUrl = m_media_url;
            camMed.MCreatedAt = DateTime.Now;

            dbc.TblCampaignMedia.Add(camMed);
            dbc.SaveChanges();

            return Ok("Insert Campaign Media ID: " + m_media_id + " successfully!");
        }

        [HttpPost]
        [Route("Update")]
        public IActionResult UpdateCampaignMed(String m_media_id, String m_campaign_id, String m_media_type, String m_media_url)
        {
            var existingCampaignMed = dbc.TblCampaignMedia.Find(m_media_id);

            existingCampaignMed.MMediaId = m_media_id;
            existingCampaignMed.MCampaignId = m_campaign_id;
            existingCampaignMed.MMediaType = m_media_type;
            existingCampaignMed.MMediaUrl = m_media_url;
            existingCampaignMed.MCreatedAt = DateTime.Now;

            dbc.TblCampaignMedia.Update(existingCampaignMed);
            dbc.SaveChanges();

            return Ok("Update CampaignMedia ID " + m_media_id + " successfully!");
        }

        [HttpPost]
        [Route("Delete")]
        public IActionResult DeleteCampaignMed(String m_media_id)
        {
            var campaignMed = dbc.TblCampaignMedia.Find(m_media_id);

            dbc.TblCampaignMedia.Remove(campaignMed);
            dbc.SaveChanges();

            return Ok("Delete CampaignMedia ID " + m_media_id + " successfully!");
        }
    }
}

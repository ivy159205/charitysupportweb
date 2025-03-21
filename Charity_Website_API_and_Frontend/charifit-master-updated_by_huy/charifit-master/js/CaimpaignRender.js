
const campaignUrl = 'https://localhost:7201/api/Campaign';
const imageUrl = 'https://localhost:7201/CampaignMed';

$(document).ready(function () {
    loadCampaignData();
});

function loadCampaignData() {
    $.ajax({
        url: `${campaignUrl}/GetList`,
        method: 'GET',
        success: function (campaigns) {
            loadCampaignImages(campaigns);
        },
        error: function (error) {
            alert('Lỗi khi tải dữ liệu chiến dịch');
            console.error(error);
        }
    });
}

function loadCampaignImages(campaigns) {
    $.ajax({
        url: `${imageUrl}/GetList`,
        method: 'GET',
        success: function (images) {
            renderCampaigns(campaigns, images);
        },
        error: function (error) {
            alert('Lỗi khi tải hình ảnh chiến dịch');
            console.error(error);
        }
    });
}

function renderCampaigns(campaigns, mediaData) {
    const campaignContainer = $('#campaignContainer');
    campaignContainer.empty();

    campaigns.forEach(campaign => {
        // Lấy ảnh từ mediaData dựa trên mCampaignId
        const media = mediaData.find(m => m.mCampaignId === campaign.cCampaignId);
        const image = media ? media.mMediaUrl : 'default.png'; // Dùng ảnh mặc định nếu không có

        // Đổi tên biến cho đúng với dữ liệu API trả về
        const raised = campaign.cCollectedAmount || 0;
        const goal = campaign.cGoalAmount || 1; // Tránh chia cho 0
        const progress = (raised / goal) * 100;

        const campaignElement = `
                <div class="single_cause">
                    <div class="thumb">
                        <img src="${image}" alt="${campaign.cTitle}" >
                    </div>
                    <div class="causes_content" >
                        <div class="custom_progress_bar">
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${progress}%"
                                    aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                                    <span class="progres_count">${Math.round(progress)}%</span>
                                </div>
                            </div>
                        </div>
                        <div class="balance d-flex justify-content-between align-items-center">
                            <span>Raised: ${raised.toLocaleString()} VNĐ</span>
                            <span>Goal: ${goal.toLocaleString()} VNĐ</span>
                        </div>
                        <h4>${campaign.cTitle}</h4>
                        <p>${campaign.cDescription || 'No description available'}</p>
                        <a class="read_more" href="cause_details.html?id=${campaign.cCampaignId}">Read More</a>
                    </div>
                </div>
            `;
        campaignContainer.append(campaignElement);
    });
}

// Chỗ này là để sửa css á!
// Vô hiệu hóa carousel sau khi render campaigns
$(document).ready(function () {
    // Đợi một chút sau khi campaigns được render
    setTimeout(function () {
        // Hủy owl carousel nếu đã được khởi tạo
        if ($('.causes_active').data('owlCarousel')) {
            $('.causes_active').data('owlCarousel').destroy();
        }
    }, 500);
});
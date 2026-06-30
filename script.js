let allVideos = [];

fetch("videos.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(videos) {
    allVideos = videos;

    showCategoryButtons(videos);
    showVideos(videos);
  });

function showCategoryButtons(videos) {
  const categoryButtons = document.getElementById("categoryButtons");

  const categories = videos.map(function(video) {
    return video.category;
  });

  const uniqueCategories = [...new Set(categories)];

  const allButton = document.createElement("button");
  allButton.textContent = "すべて";
  allButton.className = "category-button";

  allButton.addEventListener("click", function() {
    showVideos(allVideos);
  });

  categoryButtons.appendChild(allButton);

  uniqueCategories.forEach(function(category) {
    const button = document.createElement("button");

    button.textContent = category;
    button.className = "category-button";

    button.addEventListener("click", function() {
      const filteredVideos = allVideos.filter(function(video) {
        return video.category === category;
      });

      showVideos(filteredVideos);
    });

    categoryButtons.appendChild(button);
  });
}

function showVideos(videos) {
  const videoList = document.getElementById("videoList");

  videoList.innerHTML = "";

  const sortedVideos = videos.sort(function(a, b) {
    return a.order - b.order;
  });

  sortedVideos.forEach(function(video) {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <h3>${video.title}</h3>
      <p>カテゴリー：${video.category}</p>
      <p>シリーズ：${video.series}</p>
      <p>レベル：${video.level}</p>
      <p>順番：${video.order}</p>
      <a href="${video.youtubeUrl}" target="_blank">動画を見る</a>
    `;

    videoList.appendChild(card);
  });
}

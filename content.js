chrome.storage.sync.get("speed", (data) => {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.playbackRate = data.speed;
  });

  new MutationObserver(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.playbackRate = data.speed;
    });
  }).observe(document.body, { childList: true, subtree: true });
});

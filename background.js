chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ speed: 1.0 });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get("speed", (data) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: setVideoSpeed,
      args: [data.speed],
    });
  });
});

function setVideoSpeed(speed) {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.playbackRate = speed;
  });

  new MutationObserver(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.playbackRate = speed;
    });
  }).observe(document.body, { childList: true, subtree: true });
}
